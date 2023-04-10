import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    // return this.afs.collection<Post>('posts').valueChanges({
    //   idField: 'id'
    // });
    return this.httpClient.get(
      'http://localhost:3000/books'
    ).pipe(
      map((item: any) => item)
    );
  }

  getPostById(id: string) {
    return this.httpClient.get(
      `http://localhost:3000/books/${id}`
    ).pipe(
      map((item: any) => item)
    );
  }
}
