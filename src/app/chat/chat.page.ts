import { Component, OnInit } from '@angular/core';
import { Chat } from '../shared/Chat';
import { ChatService } from './../shared/chat.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  bookingForm: FormGroup;
  Bookings = [];

  constructor(private aptService: ChatService, public fb: FormBuilder) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      user: [''],
      message: [''],
    });

    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.Bookings = [];
      res.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Chat);
      });
    });
  }

  fetchBookings() {
    this.aptService
      .getBookingList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService
        .createBooking(this.bookingForm.value)
        .then((res) => {
          console.log(res);
          this.bookingForm.reset();
        })
        .catch((error) => console.log(error));
    }
  }
}
