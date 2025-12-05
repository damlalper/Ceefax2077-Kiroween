import { useTheme } from '../../context/ThemeContext';
import type { ThemePreset } from '../../context/ThemeContext';
import TeletextPage from '../../components/TeletextPage';

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme();

  const themeOrder: ThemePreset[] = ['classic', 'vaporwave', 'noir', 'amber'];

  return (
    <TeletextPage
      title="THEME ENGINE"
      subtitle="> RUNTIME VIBE SELECTOR"
      footer="SYS > THEME_SELECT: OK"
      zone={905}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.3' }}>
        
        {/* Current Theme */}
        <div style={{
          textAlign: 'center',
          padding: '0.5rem',
          border: '2px solid #00FFFF',
          marginBottom: '1rem',
          backgroundColor: '#001a1a'
        }}>
          <div style={{ color: '#666666', fontSize: '0.9em' }}>ACTIVE:</div>
          <div style={{ color: '#00FFFF', fontSize: '1.2em', fontWeight: 'bold' }}>
            {themes[currentTheme].name.toUpperCase()}
          </div>
        </div>

        {/* Theme Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {themeOrder.map((themeKey) => {
            const theme = themes[themeKey];
            const isActive = currentTheme === themeKey;

            return (
              <div
                key={themeKey}
                onClick={() => setTheme(themeKey)}
                style={{
                  padding: '0.5rem',
                  border: isActive ? '2px solid #00FFFF' : '1px solid #666666',
                  backgroundColor: isActive ? '#001a1a' : '#000000',
                  cursor: 'pointer',
                  fontSize: '0.85em'
                }}
              >
                <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>
                  {isActive && '> '}{theme.name.toUpperCase()}
                </div>
                <div style={{ color: '#666666', fontSize: '0.8em' }}>
                  {theme.description}
                </div>
                {/* Color Swatches */}
                <div style={{ display: 'flex', gap: '2px', marginTop: '0.25rem' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: theme.colors.primary,
                    border: '1px solid #333'
                  }} />
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: theme.colors.secondary,
                    border: '1px solid #333'
                  }} />
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: theme.colors.accent,
                    border: '1px solid #333'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* System Info */}
        <div style={{
          padding: '0.5rem',
          border: '1px solid #666666',
          fontSize: '0.75em',
          color: '#666666'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>EXEC: THEME_APPLY</div>
          <div>• INSTANT SWITCH: OK</div>
          <div>• CSS VARS: UPDATED</div>
          <div>• PERSIST: ENABLED</div>
          <div>• RELOAD: NOT_REQUIRED</div>
        </div>

      </div>
    </TeletextPage>
  );
}
