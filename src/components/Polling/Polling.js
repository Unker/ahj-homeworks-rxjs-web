export default class Polling {
  constructor(url, container) {
    this.url = url;
    this.container = container;

    this.messages = [];

    this.init();
  }

  init() {
    const containerPolling = document.createElement('div');
    containerPolling.innerHTML = `
      <h1>Incoming</h1>
      <div class="polling-list">
        <div class="polling-list-item">message1</div>
        <div class="polling-list-item">message2</div>
      </div>
    `;

    this.pollingList = containerPolling.querySelector('.polling-list');

    this.container.appendChild(containerPolling);
  }
}
