#!/bin/bash
namespaceName="tds"

# kubectl delete namespace $namespaceName

kubectl delete -f ingress/ingress.yaml
kubectl delete -f frontend

kubectl delete -f user-service
kubectl delete -f user-service/mongo

kubectl delete -f history-service
kubectl delete -f history-service/mongo

kubectl delete -f core-service
kubectl delete -f core-service/mongo
