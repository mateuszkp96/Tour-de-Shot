#!/bin/bash
namespaceName="tds"

kubectl apply -f mongo-service

kubectl apply -f core-service
kubectl apply -f user-service

kubectl apply -f frontend
kubectl apply -f ingress
