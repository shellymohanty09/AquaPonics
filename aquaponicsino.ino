#include <DHT.h>
#include <DHT_U.h>
#include <FirebaseArduino.h>
#include  <ESP8266WiFi.h>

#define FIREBASE_HOST "aquaponics-9999-default-rtdb.firebaseio.com"
#define WIFI_SSID "****" // Change the name of your WIFI
#define WIFI_PASSWORD "****" // Change the password of your WIFI

#define DHTPIN 14    // Data Pin of DHT 11 , for NodeMCU D5 GPIO no. is 14
#define TRIG 0  // Data pin for trig pin, for nodemcu D3 GPIO no. is 0
#define ECHO 2  // Data pin for echo pin, for nodemcu D4 GPIO no. is 2
long duration;
int distance;

#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);


void setup() {
   
   pinMode(TRIG, OUTPUT);
   pinMode(ECHO, INPUT);
   digitalWrite(TRIG, LOW);
   
   Serial.begin(9600);
   
   WiFi.begin (WIFI_SSID, WIFI_PASSWORD);
   while (WiFi.status() != WL_CONNECTED) 
   {
    delay(500);
    Serial.print(".");
  }
   dht.begin();
  Serial.println ("");
  Serial.println ("WiFi Connected!");
  Firebase.begin(FIREBASE_HOST);
  
}

void loop() {
  
  digitalWrite(0,LOW);
  delayMicroseconds(10);
  digitalWrite(0,HIGH);
  delayMicroseconds(20);
  digitalWrite(0,LOW);
  duration=pulseIn(2,HIGH);
  distance=duration*(0.01715);
  
  /*float h = dht.readHumidity();*/
  float t = dht.readTemperature();  // Reading temperature as Celsius (the default)

  Firebase.setFloat("distance", distance);
   if (Firebase.failed()) {
      Serial.print("setting /distance failed:");
      Serial.println(Firebase.error());  
      return;
}
  Firebase.setFloat ("Temp",t);
  /*Firebase.setFloat ("Humidity",h);*/
  delay(200);
}
