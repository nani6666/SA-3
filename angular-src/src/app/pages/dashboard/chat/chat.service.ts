import {Injectable} from '@angular/core';

@Injectable()
export class ChatService { 

  getChatList() {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes();

    return [
        { 
            image:'../assets/img/profile/tereza.jpg',
            author:'tereza stiles',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris justo erat, interdum vitae aliquet congue, sodales quis lorem.',
            date: new Date(year, month, day-2, hour, minute),
            side:'left'
        },
        {
            image:'../assets/img/profile/bruno.jpg',
            author:'bruno clarkson',
            text:'Vivamus a odio velit. Morbi auctor eros at orci commodo vestibulum.',
            date: new Date(year, month, day-2, hour, minute + 3),
            side:'right'
        },
        { 
            image:'../assets/img/profile/tereza.jpg',
            author:'tereza stiles',
            text:'Phasellus eu dui sit amet sem pulvinar placerat.',
            date: new Date(year, month, day-2, hour, minute + 2),
            side:'left'
        },
        {
            image:'../assets/img/profile/bruno.jpg',
            author:'bruno clarkson',
            text:'Nullam ultricies molestie aliquet. Cras interdum metus ipsum, eget ullamcorper felis elementum in.',
            date: new Date(year, month, day-2, hour, minute + 3),
            side:'right'
        },
        { 
            image:'../assets/img/profile/tereza.jpg',
            author:'tereza stiles',
            text:'Donec feugiat hendrerit purus, vel mattis leo.',
            date: new Date(year, month, day-2, hour, minute + 5),
            side:'left'
        }
    ];       


   
  }
}
