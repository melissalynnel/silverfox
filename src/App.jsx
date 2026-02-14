import React, { useEffect, useMemo, useState } from "react";

const starterButtons = [
  {
    id: "btn-1",
    label: "Call Lucy",
    cue: "Use Lucy's photo",
    image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=400&q=80",
    type: "call",
    target: "facetime://lucy@example.com",
    confirm: false,
  },
  {
    id: "btn-2",
    label: "Pharmacy Refill",
    cue: "Use pill icon",
    image: "icons/pharmacy.svg",
    type: "web",
    target: "https://example-pharmacy.com/refill",
    confirm: false,
  },
  {
    id: "btn-3",
    label: "Doctor Portal",
    cue: "Use clinic portal icon",
    image: "icons/doctor.svg",
    type: "web",
    target: "https://example-clinic.com/portal",
    confirm: false,
  },
  {
    id: "btn-4",
    label: "Family Photos",
    cue: "Use grandkids photo",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80",
    type: "app",
    target: "photos://",
    confirm: false,
  },
  {
    id: "btn-5",
    label: "Daily Reminder",
    cue: "Use a clock icon",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80",
    type: "automation",
    target: "shortcuts://run-shortcut?name=Morning%20Routine",
    confirm: false,
  },
  {
    id: "btn-6",
    label: "Message Sam",
    cue: "Use Sam's photo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    type: "message",
    target: "sms:+17205555555&body=Hi%20Sam",
    confirm: false,
  },
  {
    id: "btn-7",
    label: "Calendar",
    cue: "Use schedule planner icon",
    image: "icons/calendar.svg",
    type: "app",
    target: "calshow://",
    confirm: false,
  },
];

const typeOptions = ["web", "call", "message", "app", "automation"];

function uid() {
  return `btn-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeUrl(target) {
  if (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.includes("://")
  ) {
    return target;
  }
  return `https://${target}`;
}

export default function App() {
  const [mode, setMode] = useState("elder");
  const [isLocked, setIsLocked] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [fontSize, setFontSize] = useState("xl");
  const [highContrast, setHighContrast] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [buttons, setButtons] = useState(starterButtons);
  const [now, setNow] = useState(new Date());

  const sizeClass = useMemo(() => `size-${fontSize}`, [fontSize]);
  const timeLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now),
    [now]
  );
  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now),
    [now]
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unlockEditor = () => {
    if (pinInput === "2026") {
      setIsLocked(false);
      setPinInput("");
      return;
    }
    window.alert("Incorrect PIN. Try 2026 in this prototype.");
  };

  const lockEditor = () => {
    setIsLocked(true);
    setPinInput("");
  };

  const runButton = (button) => {
    if (!button.target) return;
    const href = normalizeUrl(button.target);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const updateButton = (id, patch) => {
    setButtons((prev) => prev.map((btn) => (btn.id === id ? { ...btn, ...patch } : btn)));
  };

  const addButton = () => {
    setButtons((prev) => [
      ...prev,
      {
        id: uid(),
        label: "New Button",
        cue: "Add recognizable image guidance",
        image: "",
        type: "web",
        target: "https://",
        confirm: false,
      },
    ]);
  };

  const deleteButton = (id) => {
    setButtons((prev) => prev.filter((btn) => btn.id !== id));
  };

  const handleLockToggle = () => {
    if (mode === "elder") {
      setMode("caregiver");
      return;
    }
    if (!isLocked) {
      lockEditor();
    }
    setMode("elder");
  };

  return (
    <div
      className={`silverfox ${sizeClass} ${highContrast ? "contrast" : ""} ${reduceMotion ? "reduced-motion" : ""}`}
    >
      <button className="lock-toggle" type="button" onClick={handleLockToggle}>
        {mode === "elder" ? "Unlock" : isLocked ? "Return" : "Lock"}
      </button>

      {mode === "elder" && (
        <main className="elder-main">
          <section className="center-clock" aria-label="Current date and time">
            <p className="clock-time">{timeLabel}</p>
            <p className="clock-date">{dateLabel}</p>
          </section>
          <section className="dock-layer" aria-label="Main control buttons">
            <div className="dock-strip">
              {buttons.map((button) => (
                <article key={button.id} className="dock-item">
                  <button
                    className="circle-button"
                    type="button"
                    onClick={() => runButton(button)}
                    aria-label={`${button.label}. Opens immediately.`}
                  >
                    <span className="photo-wrap" aria-hidden="true">
                      {button.image ? <img src={button.image} alt="" /> : <span className="placeholder">+</span>}
                    </span>
                  </button>
                  <span className="label">{button.label}</span>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {mode === "caregiver" && (
        <main className="editor">
          <section className="prefs" aria-label="Accessibility preset controls">
            <label>
              Text Size
              <select value={fontSize} onChange={(event) => setFontSize(event.target.value)}>
                <option value="l">Large</option>
                <option value="xl">Extra Large</option>
                <option value="xxl">Huge</option>
              </select>
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => setHighContrast(event.target.checked)}
              />
              High Contrast
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(event) => setReduceMotion(event.target.checked)}
              />
              Reduced Motion
            </label>
          </section>
          <section className="editor-lock" aria-label="Editor lock state">
            {isLocked ? (
              <div className="lock-box">
                <h2>Editor Locked</h2>
                <p>Enter caregiver PIN to prevent accidental layout changes.</p>
                <div className="pin-row">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(event) => setPinInput(event.target.value)}
                    placeholder="Enter PIN"
                  />
                  <button type="button" onClick={unlockEditor}>
                    Unlock
                  </button>
                </div>
              </div>
            ) : (
              <div className="lock-box unlocked">
                <h2>Editor Unlocked</h2>
                <p>Changes sync to elder view and open immediately on button press.</p>
                <button type="button" onClick={lockEditor}>
                  Lock Editor
                </button>
              </div>
            )}
          </section>

          <section className="editor-guide">
            <h2>Button Setup Guidance</h2>
            <p>
              Use recognizable photos to improve identification. Example: use Lucy&apos;s face for
              <strong> Call Lucy</strong>.
            </p>
          </section>

          <section className="editor-list" aria-label="Button configuration list">
            <div className="editor-list-head">
              <h2>Custom Buttons ({buttons.length})</h2>
              <button type="button" onClick={addButton} disabled={isLocked}>
                Add Button
              </button>
            </div>

            {buttons.map((button) => (
              <article key={button.id} className="editor-item">
                <label>
                  Label
                  <input
                    value={button.label}
                    disabled={isLocked}
                    onChange={(event) => updateButton(button.id, { label: event.target.value })}
                  />
                </label>

                <label>
                  Action Type
                  <select
                    value={button.type}
                    disabled={isLocked}
                    onChange={(event) => updateButton(button.id, { type: event.target.value })}
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Target (URL/deeplink)
                  <input
                    value={button.target}
                    disabled={isLocked}
                    onChange={(event) => updateButton(button.id, { target: event.target.value })}
                  />
                </label>

                <label>
                  Image URL
                  <input
                    value={button.image}
                    disabled={isLocked}
                    onChange={(event) => updateButton(button.id, { image: event.target.value })}
                  />
                </label>

                <label>
                  Guidance Hint
                  <input
                    value={button.cue}
                    disabled={isLocked}
                    onChange={(event) => updateButton(button.id, { cue: event.target.value })}
                  />
                </label>

                <div className="row-actions">
                  <button type="button" onClick={() => runButton(button)}>
                    Test Open
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => deleteButton(button.id)}
                    disabled={isLocked}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
