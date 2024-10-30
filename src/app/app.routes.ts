import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SensorComponent } from './sensor/sensor.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'dashboard',
        component: HomeComponent,
        title: 'Dashboard',
        children: [
            {
                path: 'monitoring',
                component: MonitoringComponent,
                title: 'Monitoring'
            },
            {
                path: 'sensor',
                component: SensorComponent,
                title: 'Sensor'
            }
        ]
    }
];

export const routing = RouterModule.forRoot(routes);
