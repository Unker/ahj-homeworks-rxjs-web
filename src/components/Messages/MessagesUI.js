export default class PollingUI {
  constructor(container, pollingService) {
    this.container = container;
    this.pollingService = pollingService;

    const containerPolling = document.createElement('div');
    containerPolling.innerHTML = `
      <h1>Incoming</h1>
      <div class="polling-list"></div>
    `;

    this.pollingList = containerPolling.querySelector('.polling-list');
    this.container.appendChild(containerPolling);

    this.pollingService.startPolling().subscribe((newMessages) => {
      newMessages.forEach((newMessage) => {
        this.pollingService.messages[newMessage.id] = newMessage;
      });

      this.updateUI();
    });
  }

  updateUI() {
    this.pollingList.innerHTML = '';
    const sortedMessages = Object.values(this.pollingService.messages).sort(
      (a, b) => b.received - a.received,
    );

    sortedMessages.forEach((message) => {
      const formattedDate = new Date(message.received * 1000).toLocaleString();
      const shortSubject = message.subject.length > 15
        ? `${message.subject.substring(0, 15)}...`
        : message.subject;

      const listItem = document.createElement('div');
      listItem.classList.add('polling-list-item');
      listItem.innerHTML = `
        <div class="message-info">
          <span class="message-email">${message.from}</span>
          <span class="message-subject">${shortSubject}</span>
          <span class="message-date">${formattedDate}</span>
        </div>
        `;

      this.pollingList.appendChild(listItem);
    });
  }
}
