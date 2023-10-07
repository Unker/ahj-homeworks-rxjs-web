import { ajax } from 'rxjs/ajax';
import { interval, from } from 'rxjs';
import {
  switchMap, catchError, map, startWith,
} from 'rxjs/operators';

export default class MessagesPollingService {
  constructor(url) {
    this.url = url;
    this.messages = {};
  }

  startPolling() {
    // Создаем поток обновлений
    return interval(5000).pipe(
      startWith(0),
      switchMap(() => ajax.getJSON(`${this.url}/messages/unread`).pipe(
        catchError((error) => {
          console.error('Ошибка при запросе:', error);
          return from([]); // Возвращаем пустой массив в случае ошибки
        }),
      )),
      map((response) => response.messages.reverse()),
    );
  }
}
