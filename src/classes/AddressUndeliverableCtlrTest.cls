/**
 * Created by mbuhler on 2018-04-05.
 */
@isTest
private class AddressUndeliverableCtlrTest {

    @isTest
    private static void getDefaultAddressContactTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;

        Test.startTest();
        npsp__Address__c address = AddressUndeliverableCtlr.getDefaultAddress(c.Id);
        Test.stopTest();

        System.assertNotEquals(null, address);
    }

    @isTest
    private static void getDefaultAddressAccountTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];

        Test.startTest();
        npsp__Address__c address = AddressUndeliverableCtlr.getDefaultAddress(accounts[0].Id);
        Test.stopTest();

        System.assertNotEquals(null, address);
    }

    @isTest
    private static void getOtherAddressesContactTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];
        npsp__Address__c address = new npsp__Address__c(npsp__Household_Account__c = accounts[0].Id, npsp__MailingStreet__c = '123 Fake St.');
        insert address;

        Test.startTest();
        List<npsp__Address__c> addresses = AddressUndeliverableCtlr.getOtherAddresses(c.Id);
        Test.stopTest();

        System.assertNotEquals(null, addresses);
        System.assertEquals(1, addresses.size());
    }

    @isTest
    private static void getOtherAddressesAccountTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];
        npsp__Address__c address = new npsp__Address__c(npsp__Household_Account__c = accounts[0].Id, npsp__MailingStreet__c = '123 Fake St.');
        insert address;

        Test.startTest();
        List<npsp__Address__c> addresses = AddressUndeliverableCtlr.getOtherAddresses(accounts[0].Id);
        Test.stopTest();

        System.assertNotEquals(null, addresses);
        System.assertEquals(1, addresses.size());
    }

    @isTest
    private static void getAccountIdContactTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];

        Test.startTest();
        String accountId = AddressUndeliverableCtlr.getAccountId(c.Id);
        Test.stopTest();

        System.assertEquals(accounts[0].Id, accountId);
    }

    @isTest
    private static void getAccountIdAccountTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];

        Test.startTest();
        String accountId = AddressUndeliverableCtlr.getAccountId(accounts[0].Id);
        Test.stopTest();

        System.assertEquals(accounts[0].Id, accountId);
    }

    @isTest
    private static void setUndeliverableAddressTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];
        List<npsp__Address__c> addresses = [SELECT Id FROM npsp__Address__c WHERE npsp__Household_Account__c = :accounts[0].Id];

        Test.startTest();
        AddressUndeliverableCtlr.setUndeliverableAddress(addresses[0].Id, true);
        Test.stopTest();

        List<npsp__Address__c> updatedAddresses = [SELECT Id, Undeliverable_Date__c FROM npsp__Address__c WHERE npsp__Household_Account__c = :accounts[0].Id];
        System.assertEquals(Date.today(), updatedAddresses[0].Undeliverable_Date__c);
    }

    @isTest
    private static void setDefaultAddressTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];
        npsp__Address__c address = new npsp__Address__c(npsp__Household_Account__c = accounts[0].Id, npsp__MailingStreet__c = '123 Fake St.');
        insert address;

        Test.startTest();
        AddressUndeliverableCtlr.setDefaultAddress(address.Id);
        Test.stopTest();

        List<npsp__Address__c> addresses = [SELECT Id FROM npsp__Address__c WHERE npsp__Household_Account__c = :accounts[0].Id AND npsp__Default_Address__c = true];
        System.assertNotEquals(null, addresses);
        System.assertEquals(address.Id, addresses[0].Id);
    }

    @isTest
    private static void createAddressTest() {
        Contact c = new Contact(FirstName = 'John', LastName = 'TestUser', MailingStreet = '2700 Production Way', MailingCity = 'Burnaby', MailingState = 'BC', MailingCountry = 'Canada');
        insert c;
        List<Account> accounts = [SELECT Id FROM Account];

        Test.startTest();
        AddressUndeliverableCtlr.createAddress(accounts[0].Id, '123 Fake St.', null, null, null, null, null);
        Test.stopTest();

        List<npsp__Address__c> addresses = [SELECT Id FROM npsp__Address__c WHERE npsp__Household_Account__c = :accounts[0].Id AND npsp__MailingStreet__c = '123 Fake St.'];
        System.assertNotEquals(null, addresses);
        System.assertEquals(1, addresses.size());
    }

}