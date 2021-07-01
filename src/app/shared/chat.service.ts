import { Injectable } from '@angular/core';
import { Chat } from '../shared/Chat';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createBooking(apt: Chat) {
    return this.bookingListRef.push({
      user: apt.user,
      message: apt.message,
    });
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/chat');
    return this.bookingListRef;
  }
}
