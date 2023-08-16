import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts';// (combined local-server posts for persistent changes ) or external(change to https://jsonplaceholder.typicode.com/posts)

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); 
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${post.id}`, post); // Use http.put for update
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
