/**
 * Created by mbuhler on 2018-04-05.
 */
public with sharing class AddressUndeliverableCtlr {

    private static Map<String, Id> accRTIdsByDeveloperName = trac_Utils.getRecordTypeIdsByDeveloperName(Account.SObjectType);

    @auraEnabled
    public static npsp__Address__c getDefaultAddress(Id recordId) {
        List<npsp__Address__c> addresses;

        if (recordId.getSobjectType() == Account.SObjectType) {
            addresses = [SELECT Id, npsp__Formula_MailingAddress__c, Undeliverable_Date__c
                         FROM npsp__Address__c
                         WHERE npsp__Household_Account__c = :recordId AND npsp__Default_Address__c = true];
        }
        else if (recordId.getSobjectType() == Contact.SObjectType) {
            List<Contact> contacts = [SELECT Id, AccountId
                                      FROM Contact
                                      WHERE Id = :recordId];
            if (!contacts.isEmpty()) {
                addresses = [SELECT Id, npsp__Formula_MailingAddress__c, Undeliverable_Date__c
                             FROM npsp__Address__c
                             WHERE npsp__Household_Account__c = :contacts[0].AccountId AND npsp__Default_Address__c = true];
            }
        }

        if (!addresses.isEmpty()) {
            return addresses[0];
        }
        else {
            return null;
        }
    }

    @auraEnabled
    public static List<npsp__Address__c> getOtherAddresses(Id recordId) {
        List<npsp__Address__c> addresses;

        if (recordId.getSobjectType() == Account.SObjectType) {
            addresses = [SELECT Id, npsp__Formula_MailingAddress__c, Undeliverable_Date__c
                         FROM npsp__Address__c
                         WHERE npsp__Household_Account__c = :recordId AND npsp__Default_Address__c = false AND Undeliverable_Date__c = null];
        }
        else if (recordId.getSobjectType() == Contact.SObjectType) {
            List<Contact> contacts = [SELECT Id, AccountId
                                      FROM Contact
                                      WHERE Id = :recordId];
            if (!contacts.isEmpty()) {
                addresses = [SELECT Id, npsp__Formula_MailingAddress__c, Undeliverable_Date__c
                             FROM npsp__Address__c
                             WHERE npsp__Household_Account__c = :contacts[0].AccountId AND npsp__Default_Address__c = false AND Undeliverable_Date__c = null];
            }
        }

        if (!addresses.isEmpty()) {
            return addresses;
        }
        else {
            return null;
        }
    }

    @auraEnabled
    public static String getAccountId(Id recordId) {
        if (recordId.getSobjectType() == Account.SObjectType) {
            return recordId;
        }
        else if (recordId.getSobjectType() == Contact.SObjectType) {
            List<Contact> contacts = [SELECT Id, AccountId
                                      FROM Contact
                                      WHERE Id = :recordId];
            if (!contacts.isEmpty()) {
                return contacts[0].AccountId;
            }
        }
        return null;
    }

    @auraEnabled
    public static void setUndeliverableAddress(Id addressId, Boolean clearContactAddress) {
        List<npsp__Address__c> addresses = [SELECT Id, Undeliverable_Date__c, npsp__Default_Address__c, npsp__Household_Account__c, npsp__Household_Account__r.npe01__One2OneContact__c,
                                                npsp__MailingCity__c, npsp__MailingCountry__c, npsp__MailingPostalCode__c, npsp__MailingState__c, npsp__MailingStreet2__c,
                                                npsp__MailingStreet__c
                                            FROM npsp__Address__c
                                            WHERE Id = :addressId];
        if (!addresses.isEmpty()) {
            List<Contact> contacts;
            if (clearContactAddress) {
                contacts = [SELECT Id, AccountId, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry
                            FROM Contact
                            WHERE Id = :addresses[0].npsp__Household_Account__r.npe01__One2OneContact__c];
                if (!contacts.isEmpty()) {
                    contacts[0].MailingStreet = null;
                    contacts[0].MailingCity = null;
                    contacts[0].MailingState = null;
                    contacts[0].MailingPostalCode = null;
                    contacts[0].MailingCountry = null;
                    update contacts[0];
                }
            }
            addresses[0].Undeliverable_Date__c = Date.today();
            addresses[0].npsp__Default_Address__c = false;
            update addresses[0];

            if (contacts != null && !contacts.isEmpty()) {
                contacts[0].npsp__Current_Address__c = null;
                update contacts[0];
            }
        }

        Account acc = [SELECT Id, RecordTypeId, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry
                       FROM Account
                       WHERE Id = :addresses[0].npsp__Household_Account__c];
        if (acc.RecordTypeId == accRTIdsByDeveloperName.get('Organization')) {
            acc.BillingStreet = null;
            acc.BillingCity = null;
            acc.BillingState = null;
            acc.BillingPostalCode = null;
            acc.BillingCountry = null;
            update acc;
        }
    }

    @auraEnabled
    public static void setDefaultAddress(Id addressId) {
        List<npsp__Address__c> addresses = [SELECT Id, npsp__Default_Address__c
                                            FROM npsp__Address__c
                                            WHERE Id = :addressId];
        if (!addresses.isEmpty()) {
            addresses[0].npsp__Default_Address__c = true;
            update addresses[0];
        }
    }

    @auraEnabled
    public static void createAddress(Id accountId, String street1, String street2, String city, String province, String postalCode, String country) {
        npsp__Address__c address = new npsp__Address__c(
            npsp__Household_Account__c = accountId,
            npsp__MailingStreet__c = street1,
            npsp__MailingStreet2__c = street2,
            npsp__MailingCity__c = city,
            npsp__MailingState__c = province,
            npsp__MailingPostalCode__c = postalCode,
            npsp__MailingCountry__c = country,
            npsp__Default_Address__c = true
        );
        insert address;
    }

}