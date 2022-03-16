import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonAvatar,
  IonLabel,
  IonList
} from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import './Tab2.css';

interface IUser {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

const Tab2: React.FC = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const sendRequest = () => {
    return axios.get('https://dummyapi.io/data/v1/user', {
      headers: {
        'app-id': '6231d99c268b1551468eb8e3'
      }
    })
    .then((response) => {
      console.log(response)
      return response.data;
    })
  };

  const pushData = () => {
    const newData: any[] = [];
    sendRequest().then((users) => {
      console.log(users)
      newData.push(users)
      setData([
        ...data,
        ...users.data
      ])
      console.log(data)
    })
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
            <IonTitle>Very real dudes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            {data.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonAvatar>
                    <img src={item.picture}/>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{item.title}</h2>
                    <h3>{item.firstName} {item.lastName}</h3>
                  </IonLabel>
                </IonItem>
              )
            })}
          </IonList>

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

export default Tab2;
