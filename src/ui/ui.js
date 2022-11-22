import "./ui.scss";
//import loadingHTML from './loading.html?raw';
//import  compatibilityHTML from './compatibility.html?raw';
//import scanningHTML from './scanning.html?raw';
const loadingHTML=`<div class="mindar-ui-overlay mindar-ui-loading">
<div class="loader"/>
</div>`;

const compatibilityHTML=`<div class="mindar-ui-overlay mindar-ui-compatibility">
<div class="content">
  <h1>Failed to launch :(</h1>
  <p>
    Looks like your device/browser is not compatible.
  </p>

  <br/>
  <br/>
  <p>
    Please try the following recommended browsers:
  </p>
  <p>
    For Android device - Chrome
  </p>
  <p>
    For iOS device - Safari
  </p>
</div>
</div>`;

const scanningHTML=`<div class="mindar-ui-overlay mindar-ui-scanning">
<div class="scanning">
  <div class="inner">
    <div class="scanline"/>
  </div>
</div>
</div>
`;

class UI {
  constructor({uiLoading, uiScanning, uiError}) {
    if (uiLoading === 'yes') {
      this.loadingModal = this._loadHTML(loadingHTML);
    } else if (uiLoading !== 'no') {
      this.loadingModal = document.querySelector(uiLoading);
    }

    if (uiError === 'yes') {
      this.compatibilityModal = this._loadHTML(compatibilityHTML);
    } else if (uiError !== 'no') {
      this.compatibilityModal = document.querySelector(uiError);
    }

    if (uiScanning === 'yes') {
      this.scanningMask = this._loadHTML(scanningHTML);
    } else if (uiScanning !== 'no') {
      this.scanningMask = document.querySelector(uiScanning);
    }

    this.hideLoading();
    this.hideCompatibility();
    this.hideScanning();
  }

  showLoading() {
    if (!this.loadingModal) return;
    this.loadingModal.classList.remove("hidden");
  }
  hideLoading() {
    if (!this.loadingModal) return;
    this.loadingModal.classList.add("hidden");
  }
  showCompatibility() {
    if (!this.compatibilityModal) return;
    this.compatibilityModal.classList.remove("hidden");
  }
  hideCompatibility() {
    if (!this.compatibilityModal) return;
    this.compatibilityModal.classList.add("hidden");
  }
  showScanning() {
    if (!this.scanningMask) return;
    this.scanningMask.classList.remove("hidden");
  }
  hideScanning() {
    if (!this.scanningMask) return;
    this.scanningMask.classList.add("hidden");
  }

  _loadHTML(html) {
    const e = document.createElement('template');
    e.innerHTML = html.trim();
    const rootNode = e.content.firstChild;
    document.getElementsByTagName('body')[0].appendChild(rootNode);
    return rootNode;
  }
}

export {
  UI
}
