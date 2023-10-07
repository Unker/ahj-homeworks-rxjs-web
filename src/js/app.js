import '../components/Messages/MessagesUI.css';
import MessagesPollingService from '../components/Messages/MessagesPollingService';
import MessagesUI from '../components/Messages/MessagesUI';

const messageContainer = document.querySelector('.polling-container');
const pollingService = new MessagesPollingService(process.env.SERVER_URL
    || 'https://unker-ahj-homeworks-rxjs-server.onrender.com');
const messagesUI = new MessagesUI(messageContainer, pollingService);
