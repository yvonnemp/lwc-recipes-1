public with sharing class MerchandiseUtility {
    
    @AuraEnabled(cacheable=true)

    public static List<Merchandise__c> getMerchandiseList(){
        return[SELECT Id, Name, Status__c, Quantity_Requested__c FROM Merchandise__c];
        //     try {
                
        //     } catch (Exception e) {
        //         throw new AuraHandledException(e.getMessage());
        //     }
        // }

    }    
}
