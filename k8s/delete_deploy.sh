#!/bin/bash
namespaceName="tds"

# kubectl delete namespace $namespaceName

kubectl delete -f ingress
kubectl delete -f frontend

kubectl delete -f user-service
kubectl delete -f core-service

kubectl delete -f mongo-service

