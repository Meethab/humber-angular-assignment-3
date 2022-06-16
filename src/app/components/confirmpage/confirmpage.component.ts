import { OrderData } from 'src/app/models/order.interface';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';

@Component({
  selector: 'confirmpage',
  templateUrl: './confirmpage.component.html',
  styleUrls: ['./confirmpage.component.scss']
})
export class ConfirmpageComponent implements OnInit {

  orderNo:string='';
  orderTotal=0;
  orderdata: OrderData = {
    orderNumber: '',
    total:''
  };
  constructor(private datastore: DataStoreService) { }

  ngOnInit(): void {
    this.orderNo = Math.ceil(Math.random()*100000).toString();
    this.orderdata.orderNumber = this.orderNo;
    this.datastore.cartItems$.pipe(
      filter(res=> res.length>0),take(1)
    ).subscribe((cartItem: ProductData[])=>{
      cartItem.forEach(item =>{
        this.orderTotal=+ item.price.substring(1,item.price.length) +
                                    this.orderTotal;
        this.orderdata.total = this.orderTotal.toString();                            
      })
      
      this.datastore.addToOrder(this.orderdata);
    });
    
    this.datastore.clearCart();
  }

}
