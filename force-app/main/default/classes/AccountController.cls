public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        //String userId = UserInfo.getUserId();
        List<Account> accountList = [SELECT Id, Name, Status_of_Account__c, Account_Representative__c FROM Account WHERE OwnerId=:UserInfo.getUserId()] ;
        return accountList;
    }

    @AuraEnabled(cacheable=true)
    public static Account getSingleAccount() {
        return [
            SELECT Id, Name, Phone, Type
            FROM Account
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }
}
