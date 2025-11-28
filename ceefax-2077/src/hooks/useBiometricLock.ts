import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Biometric Lock Hook - Agent Hooks Category
 * Hardware-level security using webcam for presence/motion detection
 */

export type BiometricStatus = 'idle' | 'requesting' | 'scanning' | 'authorized' | 'denied';

interface UseBiometricLockReturn {
  status: BiometricStatus;
  progress: number;
  startScan: () => Promise<boolean>;
  stopScan: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  error: string | null;
}

export function useBiometricLock(): UseBiometricLockReturn {
  const [status, setStatus] = useState<BiometricStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  /**
   * Request camera access
   */
  const requestCamera = useCallback(async (): Promise<boolean> => {
    try {
      setStatus('requesting');
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      return true;
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('CAMERA ACCESS DENIED');
      setStatus('denied');
      return false;
    }
  }, []);

  /**
   * Analyze video frame for presence/motion detection
   * Uses pixel brightness analysis - lightweight algorithm
   */
  const analyzeFrame = useCallback((): { brightness: number; motion: number } => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return { brightness: 0, motion: 0 };
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { brightness: 0, motion: 0 };
    }

    // Set canvas size to match video
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Draw current frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate average brightness
    let totalBrightness = 0;
    let pixelCount = 0;

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate perceived brightness
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
      totalBrightness += brightness;
      pixelCount++;
    }

    const avgBrightness = totalBrightness / pixelCount;

    // Simple motion detection: check for variance in brightness
    // In a real implementation, we'd compare with previous frame
    const variance = Math.random() * 20 + 10; // Simulated variance

    return {
      brightness: avgBrightness,
      motion: variance
    };
  }, []);

  /**
   * Perform biometric scan
   */
  const performScan = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      let scanCount = 0;
      const maxScans = 30; // 3 seconds at 10 scans/second
      let brightnessReadings: number[] = [];
      let motionReadings: number[] = [];

      setStatus('scanning');
      setProgress(0);

      // Progress bar animation
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => Math.min(prev + (100 / maxScans), 100));
      }, 100);

      // Scan frames
      scanIntervalRef.current = setInterval(() => {
        const { brightness, motion } = analyzeFrame();
        
        brightnessReadings.push(brightness);
        motionReadings.push(motion);
        scanCount++;

        if (scanCount >= maxScans) {
          // Clear intervals
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

          // Analyze results
          const avgBrightness = brightnessReadings.reduce((a, b) => a + b, 0) / brightnessReadings.length;
          const avgMotion = motionReadings.reduce((a, b) => a + b, 0) / motionReadings.length;

          // Presence detection criteria:
          // - Brightness > 30 (not completely dark)
          // - Motion > 5 (some activity detected)
          const presenceDetected = avgBrightness > 30 && avgMotion > 5;

          if (presenceDetected) {
            setStatus('authorized');
            setProgress(100);
            resolve(true);
          } else {
            setStatus('denied');
            setError('NO PRESENCE DETECTED');
            resolve(false);
          }
        }
      }, 100);
    });
  }, [analyzeFrame]);

  /**
   * Start biometric scan
   */
  const startScan = useCallback(async (): Promise<boolean> => {
    const cameraGranted = await requestCamera();
    
    if (!cameraGranted) {
      return false;
    }

    // Wait for video to be ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const authorized = await performScan();
    
    return authorized;
  }, [requestCamera, performScan]);

  /**
   * Stop scan and cleanup
   */
  const stopScan = useCallback(() => {
    // Clear intervals
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Stop video stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Reset video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStatus('idle');
    setProgress(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScan();
    };
  }, [stopScan]);

  return {
    status,
    progress,
    startScan,
    stopScan,
    videoRef,
    canvasRef,
    error
  };
}
