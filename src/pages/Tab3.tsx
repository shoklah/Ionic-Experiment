import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonFabButton,
  IonFab,
  IonIcon,
  IonModal,
  IonInput,
  IonItem,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import './Tab3.css';
import { add } from 'ionicons/icons';

interface IWidget {
  city: string,
  weather: {
    description: string;
    icon: string;
  };
  temp: string;
  humidity: string;
  pressure: string;
  wind: {
    speed: string;
    deg: string;
  }
}

const Tab3: React.FC = () => {
  const [widgets, setWidgets] = useState<IWidget[]>([]);
  const [city, setCity] = useState<string>("");

  const sendRequest = () => {
    return axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1496441316839412fc14c32c0b803f36')
    .then((response) => {
      console.log(response)
      return response.data;
    })
  };

  const addWidget = () => {
    const newWidgets: any[] = [];
    sendRequest().then((weather) => {
      const newWidget: IWidget = {
        city: city,
        weather: {
          description: weather.weather[0].description,
          icon: weather.weather[0].icon,
        },
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        wind: {
          speed: weather.wind.speed,
          deg: weather.wind.deg,
        }
      }
      newWidgets.push(newWidget)
      setWidgets([
        ...widgets,
        ...newWidgets
      ]);
    })
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-text-center">
        {widgets.map((item, index) => {
          return (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>{item.city}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      {item.weather.description}
                    </IonCol>
                    <IonCol>
                      {item.temp} °F
                    </IonCol>
                    <IonCol>
                      {item.humidity} %
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      Wind:
                    </IonCol>
                    <IonCol>
                      {item.wind.speed} km/h
                    </IonCol>
                    <IonCol>
                      {item.wind.deg} °
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          )
        })}
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton id="trigger-button">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonModal 
          swipeToClose={true}
          presentingElement={undefined}
          trigger="trigger-button"
        >
          <IonContent>
            <IonItem>
              <IonInput
                value={city}
                placeholder="Enter city"
                onIonChange={e => setCity(e.detail.value!)}
              />
            </IonItem>
            <IonButton
              expand="block"
              size="large"
              onClick={e => addWidget()}
            >
              Add Widget
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
