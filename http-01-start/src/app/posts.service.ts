import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Product } from './post.model';
import { Subject, debounce, map, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  error = new Subject();
  base_url: string =
    'https://dummyjson.com/';

  // doesn't care about the response/ response status
  createAndStoreProduct(title: string, content: string) {
    const postData: Product =  {
      "title": title,
      "description": content,
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      "images": [
      ]
    };
    this.http.post<any>(this.base_url + 'products/add', postData).subscribe(
      {
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
          this.error.next(e.message);
        }
      }
    )
  }

  fetchProducts() {
    // returns an observable to subscribe to in component file
    // doe care about the response/ response status so subscription is done outside of file
    return this.http
      .get<any>(this.base_url + 'products')
      .pipe(
        debounce(() => timer(2000))
      );
    // going to use subjects here.
    // since this will be a subject no need to subscribe here
    // the "subscription/ listening will be done in -> app.component.ts"
    // .subscribe((requestData) => {
    //   // console.log(requestData);
    // });
  }

  deleteProduct(id: number) {
    const deleteUrl = `${this.base_url}products/${id}`;

    return this.http.delete(deleteUrl);
  }

  constructor(private http: HttpClient) {}
}
