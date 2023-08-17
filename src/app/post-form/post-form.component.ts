import { Component, OnInit, Input, Output, EventEmitter, Renderer2  } from '@angular/core';
import { PostsService } from '../posts.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AppStateService} from "../app-state.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
   mode: 'Add' | 'Edit' = 'Add';
   postId: number | null = null;
   formSubmitted = new EventEmitter();

  post = {
    title: '',
    body: '',
    image: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private postsService: PostsService, private appState: AppStateService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.mode = 'Edit';
        this.postId = parseInt(params['id'], 10);

        this.postsService.getPost(this.postId).subscribe(post => {
          this.post = post;
        });
      } else {
        this.mode = 'Add';
      }
    });
  }

  ngAfterContentInit(): void {
      document.querySelectorAll("input")[0]!.onkeydown = document.querySelectorAll("textarea")[0]!.onkeydown = ()=> 
      {
        document.querySelectorAll("input")[0].classList.remove('border','border-danger');
        document.querySelectorAll("textarea")[0].classList.remove('border','border-danger');
      }
    };


  onSubmit(): (void|boolean) {
    if(this.post.title.length < 2 || this.post.body.length < 5 || (this.post.title.length > 20 && !this.post.title.substring(0,30).includes(" ")))
    {
      if(this.post.title.length < 2 || (this.post.title.length > 20 && !this.post.title.substring(0,30).includes(" ")))
      document.querySelector("[type='text']")?.classList.add('border','border-danger');
      if(this.post.body.length < 5)
      document.querySelector("textarea")?.classList.add('border','border-danger');
      return false;    
  }


    if (this.mode === 'Add') {
      this.postsService.createPost(this.post).subscribe(newPost => {
        this.appState.addPost(newPost);
        this.router.navigate(['/']);
      });
    } else if (this.mode === 'Edit') {
      this.postsService.updatePost(this.post).subscribe(updatedPost => {  
        this.appState.updatePost(updatedPost);
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            const updatedPostElement = document.getElementById(`${updatedPost.id}`);
            if (updatedPostElement) {
              this.renderer.setAttribute(updatedPostElement, 'class', 'flash-post'); // Just to highlight the scroll target
              updatedPostElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 700); // some time for the routing to complete
        });
      });
    }
  }

  isFileImage(file: File): boolean {
    return file && file['type'].split('/')[0] === 'image';
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0 && inputElement.files[0].size < 8000000) {
      const file = inputElement.files[0];
      // Read the file and store its data in post.image
      if(!this.isFileImage(file))
      {
        alert("Upload an Image");
        inputElement.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target)
        this.post.image = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
    else{
      alert("File Too Large");
      inputElement.value = '';
    }
  }
}
