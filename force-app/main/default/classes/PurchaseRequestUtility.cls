public with sharing class PurchaseRequestUtility {

    @AuraEnabled(cacheable=true)
    public static List<Purchase_Request__c> getPurchaseRequestList() {
        return [SELECT Id, Name, Quantity__c, Status__c, Closed__c FROM Purchase_Request__c];
    }
}
