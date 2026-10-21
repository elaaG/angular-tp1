import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
  imports: [FormsModule, CurrencyPipe],
})
export class TtcComponent {
  protected price = signal(0);
  protected quantity = signal(1);
  protected tva = signal(18);

  protected unitPriceTtc = computed(
    () => this.price() * (1 + this.tva() / 100),
  );

  protected discountRate = computed(() => {
    const quantity = this.quantity();
    if (quantity > 15) return 0.3;
    if (quantity > 10) return 0.2;
    return 0;
  });

  protected grossTotal = computed(() => this.unitPriceTtc() * this.quantity());
  protected discount = computed(() => this.grossTotal() * this.discountRate());
  protected total = computed(() => this.grossTotal() - this.discount());
}
