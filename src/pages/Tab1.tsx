import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const sendRequest = () => {
    return axios.get('https://api.kanye.rest')
    .then((response) => {
      console.log(response)
      return response.data;
    })
  };

  const pushData = () => {
    const max = data.length + 20;
    const min = max - 20;
    const newData: any[] = [];
    for (let i = min; i < max; i++) {
      sendRequest().then((quote) => {
        newData.push(quote.quote)
        setData([
          ...data,
          ...newData
        ])
      })
    }
  }

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      ev.target.complete();
      if (data.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
  }  
  
  useIonViewWillEnter(() => {
    pushData();
  })
    return(
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Kanye is the Real Deal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-text-center">
          {data.map((item, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardSubtitle>Good News !</IonCardSubtitle>
                  <IonCardTitle>Kanye Says</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {item}
                </IonCardContent>
              </IonCard>
            )
          })}

        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        </IonContent>
      </IonPage>
    );
};

export default Tab1;
