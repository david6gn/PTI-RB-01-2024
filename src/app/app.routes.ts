import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SensorComponent } from './sensor/sensor.component';
import { ToolsComponent } from './tools/tools.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import { SensorInfoComponent } from './sensor-info/sensor-info.component';
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
                title: 'Sensor', 
                children: [
                    {
                        path: 'data/:type', 
                        component: SensorDataComponent,
                        title: 'Data Sensor'
                    },
                    {
                        path: 'info/:type',
                        component: SensorInfoComponent,
                        title: 'Informasi Sensor'
                    }
                  ]
            },
            {
                path: 'tools',
                component: ToolsComponent,
                title: 'Alat'
            },
            {
                path: 'history',
                component: HistoryComponent,
                title: 'Riwayat'
            },
            {
                path: 'notification',
                component: NotificationComponent,
                title: 'Notifikasi'
            },
        ]
    }
];

export const routing = RouterModule.forRoot(routes);
