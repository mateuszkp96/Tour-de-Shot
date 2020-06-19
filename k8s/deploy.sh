#!/bin/bash
namespaceName="tds"

kubectl apply -f core-service/mongo
kubectl apply -f core-service

kubectl apply -f history-service/mongo
kubectl apply -f history-service

#kubectl apply -f user-service/mongo
#kubectl apply -f user-service

kubectl apply -f frontend
kubectl apply -f ingress/ingress.yaml
