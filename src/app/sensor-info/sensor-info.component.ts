import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sensor-info',
  standalone: true,
  imports: [],
  templateUrl: './sensor-info.component.html',
  styleUrl: './sensor-info.component.css'
})
export class SensorInfoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){}

  type: string = "";
  imageSensor: string = '';
  sensorDesc: string = '';
  sensorMaintenance = `
    Berikut adalah cara merawat sensor suhu:<br>
    1. <b>Bersihkan Secara Berkala</b>: Pastikan sensor bebas dari debu dan kotoran.<br>
    2. <b>Periksa Koneksi</b>: Pastikan semua koneksi kabel dan terminal dalam kondisi baik.<br>
    3. <b>Kalibrasi Rutin</b>: Lakukan kalibrasi secara berkala untuk memastikan sensor memberikan pembacaan yang akurat.<br>
    4. <b>Hindari Kondisi Ekstrem</b>: Jauhkan sensor dari kondisi lingkungan yang ekstrem untuk mencegah kerusakan.<br>
    5. <b>Cek Kerusakan</b>: Secara berkala, periksa apakah ada kerusakan fisik pada sensor, seperti retakan atau keausan.<br>
  `;        


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      console.log(this.type);
      switch (this.type) {
        case 'suhu':
          this.imageSensor = 'sensor_suhu.png';
          this.sensorDesc = 'Sensor suhu adalah alat yang mengukur dan memantau suhu dengan akurasi tinggi. Sensor ini mengubah perubahan suhu menjadi sinyal listrik yang dapat dianalisis, menjadikannya penting dalam berbagai aplikasi industri dan sehari-hari. Dengan menjaga suhu dalam kisaran optimal, sensor suhu mendukung efisiensi operasional, keamanan, serta otomasi dalam teknologi pintar, di mana kecepatan dan ketepatan sangat dibutuhkan.';
          break;
        case 'ph':
          this.imageSensor = 'sensor_ph.png';
          this.sensorDesc = 'Sensor pH mengukur tingkat keasaman atau kebasaan dalam larutan dengan akurat, mendeteksi ion hidrogen dan mengubahnya menjadi sinyal listrik. Alat ini penting dalam laboratorium, industri, dan pengelolaan lingkungan untuk memantau kondisi kimia, memastikan kualitas dan efisiensi di bidang seperti pengolahan air dan produksi makanan.';
          break;
        case 'salinitas':
          this.imageSensor = 'sensor_salinitas.png';
          this.sensorDesc = 'Sensor salinitas mengukur konsentrasi garam dalam air, penting untuk pemantauan kualitas air di laut dan akuakultur. Dengan mendeteksi perubahan salinitas, sensor ini membantu menjaga keseimbangan ekosistem dan memastikan kondisi optimal untuk kehidupan akuatik, serta digunakan dalam studi ilmiah dan sistem irigasi untuk mengelola kualitas air.';
          break;
        case 'kekeruhan':
          this.imageSensor = 'sensor_kekeruhan.png';
          this.sensorDesc = 'Sensor kekeruhan mengukur tingkat kejernihan air dengan menentukan sejauh mana partikel menghalangi cahaya. Alat ini penting untuk memantau kualitas air di sungai, danau, dan sistem pengolahan air. Dengan mengidentifikasi kekeruhan, sensor ini dapat mendeteksi kontaminasi dan perubahan kualitas akibat limbah atau gangguan lingkungan, menjaga kesehatan ekosistem, serta memastikan air memenuhi standar untuk kebutuhan manusia dan industri.';
          break;
        default:
          break;
      }
    });
 }

 navigateToSensorData() {
  this.router.navigate(['data', this.type], { relativeTo: this.route.parent, replaceUrl: true });
}

}
