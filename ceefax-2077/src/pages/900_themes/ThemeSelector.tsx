import { useTheme } from '../../context/ThemeContext';
import type { ThemePreset } from '../../context/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme();

  const themeOrder: ThemePreset[] = ['classic', 'vaporwave', 'noir', 'amber'];

  const renderThemePreview = (themeKey: ThemePreset) => {
    const theme = themes[themeKey];
    const isActive = currentTheme === themeKey;

    return (
      <div
        key={themeKey}
        onClick={() => setTheme(themeKey)}
        style={{
          padding: '15px',
          border: isActive ? '3px solid var(--color-accent)' : '2px solid var(--color-border)',
          background: isActive ? 'var(--color-bg-accent)' : 'var(--color-bg-primary)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          position: 'relative'
        }}
      >
        {/* Theme Name */}
        <div style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.2em',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {isActive && '► '}{theme.name}
        </div>

        {/* Description */}
        <div style={{
          color: 'var(--color-text-accent)',
          fontSize: '0.85em',
          marginBottom: '15px',
          opacity: 0.8
        }}>
          {theme.description}
        </div>

        {/* Color Swatches */}
        <div style={{
          display: 'flex',
          gap: '5px',
          marginBottom: '10px'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            background: theme.colors.primary,
            border: '1px solid var(--color-border)'
          }} title="Primary" />
          <div style={{
            width: '30px',
            height: '30px',
            background: theme.colors.secondary,
            border: '1px solid var(--color-border)'
          }} title="Secondary" />
          <div style={{
            width: '30px',
            height: '30px',
            background: theme.colors.accent,
            border: '1px solid var(--color-border)'
          }} title="Accent" />
          <div style={{
            width: '30px',
            height: '30px',
            background: theme.colors.textPrimary,
            border: '1px solid var(--color-border)'
          }} title="Text" />
        </div>

        {/* Active Indicator */}
        {isActive && (
          <div style={{
            color: 'var(--color-text-success)',
            fontSize: '0.9em',
            marginTop: '10px',
            animation: 'blink 1s infinite'
          }}>
            ✓ ACTIVE
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        color: 'var(--color-text-secondary)',
        fontSize: '1.5em',
        marginBottom: '20px',
        textAlign: 'center',
        borderBottom: '2px solid var(--color-border)',
        paddingBottom: '10px'
      }}>
        <pre style={{ margin: 0 }}>
{`
╔════════════════════════════════════╗
║       THEME ENGINE v1.0           ║
║     RUNTIME VIBE SELECTOR         ║
╚════════════════════════════════════╝
`}
        </pre>
      </div>

      {/* Description */}
      <div style={{
        color: 'var(--color-text-accent)',
        marginBottom: '25px',
        textAlign: 'center',
        fontSize: '0.9em'
      }}>
        <div>Transform the entire application instantly</div>
        <div>No reload required - Pure CSS magic</div>
      </div>

      {/* Current Theme Display */}
      <div style={{
        padding: '15px',
        background: 'var(--color-bg-accent)',
        border: '2px solid var(--color-accent)',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <div style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.1em',
          marginBottom: '5px'
        }}>
          CURRENT THEME:
        </div>
        <div style={{
          color: 'var(--color-text-primary)',
          fontSize: '1.5em',
          fontWeight: 'bold'
        }}>
          {themes[currentTheme].name.toUpperCase()}
        </div>
      </div>

      {/* Theme Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
        marginBottom: '25px'
      }}>
        {themeOrder.map(themeKey => renderThemePreview(themeKey))}
      </div>

      {/* Live Preview */}
      <div style={{
        padding: '20px',
        border: '2px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
        marginBottom: '20px'
      }}>
        <div style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.1em',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          LIVE PREVIEW:
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{
            color: 'var(--color-text-primary)',
            padding: '10px',
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)'
          }}>
            Primary Text: The quick brown fox jumps
          </div>

          <div style={{
            color: 'var(--color-text-secondary)',
            padding: '10px',
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)'
          }}>
            Secondary Text: Over the lazy dog
          </div>

          <div style={{
            color: 'var(--color-text-accent)',
            padding: '10px',
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)'
          }}>
            Accent Text: 1234567890
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}>
            <div style={{
              color: 'var(--color-text-success)',
              padding: '8px 15px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)'
            }}>
              ✓ SUCCESS
            </div>

            <div style={{
              color: 'var(--color-text-warning)',
              padding: '8px 15px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)'
            }}>
              ⚠ WARNING
            </div>

            <div style={{
              color: 'var(--color-text-danger)',
              padding: '8px 15px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)'
            }}>
              ✗ DANGER
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        padding: '15px',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-accent)',
        fontSize: '0.85em'
      }}>
        <div style={{
          color: 'var(--color-text-secondary)',
          marginBottom: '10px',
          fontSize: '1.1em'
        }}>
          HOW IT WORKS:
        </div>
        <div>• Click any theme to apply instantly</div>
        <div>• All colors update via CSS variables</div>
        <div>• Theme persists across sessions</div>
        <div>• No page reload required</div>
        <div>• Works in both Consumer & SysAdmin modes</div>
      </div>

      {/* Skeleton Crew Badge */}
      <div style={{
        marginTop: '25px',
        textAlign: 'center',
        padding: '15px',
        border: '2px solid var(--color-accent)',
        background: 'var(--color-bg-accent)'
      }}>
        <div style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.2em',
          marginBottom: '5px'
        }}>
          💀 SKELETON CREW 💀
        </div>
        <div style={{
          color: 'var(--color-text-accent)',
          fontSize: '0.85em'
        }}>
          One codebase. Infinite styles. Runtime magic.
        </div>
      </div>
    </div>
  );
}
