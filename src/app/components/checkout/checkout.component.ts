import { ProductData } from 'src/app/models/product.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';
import { nameValidator, numberValidator } from 'src/app/validators/validators';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  form!: FormGroup;

  total=0;
  constructor(private route: ActivatedRoute, private dataStore: DataStoreService,  private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, nameValidator()]),
      lastName: new FormControl('', [Validators.required, nameValidator()]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      card: new FormControl('', [Validators.required]),
      creditCardNo: new FormControl('', [Validators.required, numberValidator, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      expiry: new FormControl('', [Validators.required]),
      cvc: new FormControl('', [Validators.required, numberValidator, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nameOnCard: new FormControl('', [Validators.required])

    })

    this.dataStore.cartItems$.pipe(
      filter(x=> x.length > 0),
      take(1)
    ).subscribe((cartItems: ProductData[])=>{
      cartItems.forEach(item=>{
        this.total =+ item.price.substring(1,item.price.length) + this.total;            
        console.log(this.total)
      })
    });
  
  }

  submit(confirmpage:string):void  {
    console.log(this.form.value);
    this.router.navigate([`${confirmpage}`]);
   
  }
 

}
