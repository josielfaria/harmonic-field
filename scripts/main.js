class HarmonicFieldManager {
  constructor() {
    this.harmonicFields = this.initializeHarmonicFields();
    this.degrees = ["I", "II", "III", "IV", "V", "VI", "VII"];
    this.keyMappings = this.initializeKeyMappings();
    this.highlightStylesId = "highlight-styles";
    this.highlightAnimationClass = "highlight-animation";
    this.animationDuration = 2000;
  }

  initializeHarmonicFields() {
    return {
      major: {
        C: { name: "C", chords: ["C", "Dm", "Em", "F", "G", "Am", "Bm(b5)"] },
        Db: {
          name: "Db",
          chords: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cm(b5)"],
        },
        D: { name: "D", chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#m(b5)"] },
        Eb: {
          name: "Eb",
          chords: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Dm(b5)"],
        },
        E: {
          name: "E",
          chords: ["E", "F#m", "G#m", "A", "B", "C#m", "D#m(b5)"],
        },
        F: { name: "F", chords: ["F", "Gm", "Am", "Bb", "C", "Dm", "Em(b5)"] },
        Gb: {
          name: "Gb",
          chords: ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm", "Fm(b5)"],
        },
        G: { name: "G", chords: ["G", "Am", "Bm", "C", "D", "Em", "F#m(b5)"] },
        Ab: {
          name: "Ab",
          chords: ["Ab", "Bb", "Cm", "Db", "Eb", "Fm", "Gm(b5)"],
        },
        A: {
          name: "A",
          chords: ["A", "Bm", "C#m", "D", "E", "F#m", "G#m(b5)"],
        },
        Bb: {
          name: "Bb",
          chords: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Am(b5)"],
        },
        B: {
          name: "B",
          chords: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#m(b5)"],
        },
      },

      minor: {
        Am: { name: "Am", chords: ["Am", "Bm(b5)", "C", "Dm", "Em", "F", "G"] },
        Bbm: {
          name: "Bbm",
          chords: ["Bbm", "Cm(b5)", "Db", "Ebm", "Fm", "Gb", "Ab"],
        },
        Bm: {
          name: "Bm",
          chords: ["Bm", "C#m(b5)", "D", "Em", "F#m", "G", "A"],
        },
        Cm: {
          name: "Cm",
          chords: ["Cm", "Dm(b5)", "Eb", "Fm", "Gm", "Ab", "Bb"],
        },
        "C#m": {
          name: "C#m",
          chords: ["C#m", "D#m(b5)", "E", "F#m", "G#m", "A", "B"],
        },
        Dm: {
          name: "Dm",
          chords: ["Dm", "Em(b5)", "F", "Gm", "Am", "Bb", "C"],
        },
        Ebm: {
          name: "Ebm",
          chords: ["Ebm", "Fm(b5)", "Gb", "Abm", "Bbm", "Cb", "Db"],
        },
        Em: {
          name: "Em",
          chords: ["Em", "F#m(b5)", "G", "Am", "Bm", "C", "D"],
        },
        Fm: {
          name: "Fm",
          chords: ["Fm", "Gm(b5)", "Ab", "Bbm", "Cm", "Db", "Eb"],
        },
        "F#m": {
          name: "F#m",
          chords: ["F#m", "G#m(b5)", "A", "Bm", "C#m", "D", "E"],
        },
        Gm: {
          name: "Gm",
          chords: ["Gm", "Am(b5)", "Bb", "Cm", "Dm", "Eb", "F"],
        },
        Abm: {
          name: "Abm",
          chords: ["Abm", "Bbm(b5)", "Cb", "Dbm", "Ebm", "Fb", "Gb"],
        },
      },
    };
  }

  initializeKeyMappings() {
    return {
      majorToMinor: {
        C: "Am",
        Db: "Bbm",
        D: "Bm",
        Eb: "Cm",
        E: "C#m",
        F: "Dm",
        Gb: "Ebm",
        G: "Em",
        Ab: "Fm",
        A: "F#m",
        Bb: "Gm",
        B: "G#m",
      },
      minorToMajor: {
        Am: "C",
        Bbm: "Db",
        Bm: "D",
        Cm: "Eb",
        "C#m": "E",
        Dm: "F",
        Ebm: "Gb",
        Em: "G",
        Fm: "Ab",
        "F#m": "A",
        Gm: "Bb",
        Abm: "Cb",
        "G#m": "B",
      },
    };
  }

  getRelativeKey(key, type) {
    if (type === "major") {
      return this.keyMappings.majorToMinor[key];
    }
    return this.keyMappings.minorToMajor[key];
  }

  createHarmonicTable(key, data, type) {
    const bgClass = type === "major" ? "bg-secondary" : "bg-dark";
    const relativeKey = this.getRelativeKey(key, type);

    const degreesCells = this.degrees
      .map((degree) => `<td>${degree}</td>`)
      .join("");
    const chordsCells = data.chords
      .map((chord) => `<td>${chord}</td>`)
      .join("");

    return `
        <div class="col-12 col-md-6 col-xl-4">
            <div class="table-responsive">
                <table class="table table-bordered table-sm harmonic-table">
                    <thead class="table-light">
                        <tr>
                            <th colspan="7" class="text-center ${bgClass} text-white">
                                ${data.name}
                            </th>
                            <th class="text-center">
                                <button class="btn btn-sm btn-outline-warning" 
                                                onclick="harmonicManager.scrollToKey('${relativeKey}')" 
                                                title="Ir para relativo ${relativeKey}">
                                    ↔
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${this.degrees
                              .map(
                                (degree, index) =>
                                  `<td class="text-center">${degree}<br><strong>${data.chords[index]}</strong></td>`,
                              )
                              .join("")}
                            <td class="text-center">
                                <small class="text-warning fs-5 fw-bold">${relativeKey}</small>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
  }

  findTableByKey(key) {
    const tables = document.querySelectorAll("table.harmonic-table");

    for (const table of tables) {
      const headerCell = table.querySelector("th");
      if (headerCell && headerCell.textContent.trim() === key) {
        return table;
      }
    }
    return null;
  }

  removeExistingHighlights() {
    document
      .querySelectorAll(`.${this.highlightAnimationClass}`)
      .forEach((element) =>
        element.classList.remove(this.highlightAnimationClass),
      );
  }

  highlightTable(key) {
    this.removeExistingHighlights();

    setTimeout(() => {
      const targetTable = this.findTableByKey(key);

      if (targetTable) {
        targetTable.classList.add(this.highlightAnimationClass);

        setTimeout(() => {
          targetTable.classList.remove(this.highlightAnimationClass);
        }, this.animationDuration);
      }
    }, 200);
  }

  getKeyType(key) {
    if (this.harmonicFields.major[key]) return "major";
    if (this.harmonicFields.minor[key]) return "minor";
    return null;
  }

  switchToTab(tabType) {
    const tabId = `#${tabType}-tab`;
    const tabElement = document.querySelector(tabId);

    if (tabElement && window.bootstrap) {
      const bsTab = new bootstrap.Tab(tabElement);
      bsTab.show();
    }
  }

  generateHarmonicFields() {
    const majorContainer = document.getElementById("majorKeysContainer");
    const minorContainer = document.getElementById("minorKeysContainer");

    if (!majorContainer || !minorContainer) {
      console.error("Required containers not found");
      return;
    }

    // Generate major keys
    majorContainer.innerHTML = Object.entries(this.harmonicFields.major)
      .map(([key, data]) => this.createHarmonicTable(key, data, "major"))
      .join("");

    // Generate minor keys
    minorContainer.innerHTML = Object.entries(this.harmonicFields.minor)
      .map(([key, data]) => this.createHarmonicTable(key, data, "minor"))
      .join("");
  }

  scrollToKey(key) {
    const keyType = this.getKeyType(key);

    if (!keyType) {
      console.warn(`Key "${key}" not found`);
      return;
    }

    // Switch to appropriate tab
    this.switchToTab(keyType);

    // Wait for tab transition, then scroll and highlight
    setTimeout(() => {
      const element =
        this.findTableByKey(key) ||
        document.querySelector(`[data-key="${key}"]`);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        this.highlightTable(key);
      }
    }, 150);
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.generateHarmonicFields(),
      );
    } else {
      this.generateHarmonicFields();
    }
  }
}

// Initialize the harmonic field manager
const harmonicManager = new HarmonicFieldManager();
harmonicManager.init();
