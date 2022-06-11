/*Order Form Component
1.	Must show appropriate toast messages

2.	Logged-in user can choose from their accounts. NOTE: account cannot be blank.
        - required field - DONE
        - logged in can now choose from the accounts - DONE

3.	Accepts the value entered on Quantity to Purchase field. NOTE: input cannot be blank.
        - required field - DONE

4.	If the Account chosen is approved, creates a Purchase Request record related to the Account, 
    and the Merchandise with the Quantity entered, whose status set to new. 
        - retrieved all accounts - DONE

5.	If the new Purchase Request and/or related Purchase Requests created meets the Minimum Amount 
    to Produce, this will create a Production Request, and relate all existing Purchase Request with the 'New' 
    status to the Production Request.

*/

import { LightningElement, api, wire, track } from 'lwc';

//import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getMerchandiseList from '@salesforce/apex/MerchandiseUtility.getMerchandiseList';
import getPurchaseRequestList from '@salesforce/apex/PurchaseRequestUtility.getPurchaseRequestList';

import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class orderForm extends LightningElement {

    //for account
    @track accValue = '';
    @track optionsArray = [];

    //link html and js
    get accountOptions() {
        return this.optionsArray;
    }

    //array account list 
    connectedCallback() {
        getAccountList().then(response=>{
            let accArray = [];
            for(var i=0; i<response.length; i++) {
                accArray.push( { label : response[i].Name , value : response[i].Id } )
            }
            this.optionsArray = accArray;
        })
    }


    //get selected account
    handleSelectedAccount(event) {
        //store the selected account
        this.accValue = event.detail.value;
    }

    // Merchandise and Purchase Request

    @wire(getMerchandiseList, { merchId : '$recordId' })
    merchList;

    @wire(getPurchaseRequestList, { merchId:'$recordId', puRStatus:'$puRStatus' })
    relatedPurchaseRequests;

    //variable for quantity field and selected account
    @track typedValue = 0;  

    //Accepts the value entered on Quantity to Purchase field. NOTE: input cannot be blank
    handleQuantityInput(event) {
        this.typedValue = event.detail.value;
    }

    handleRequestBtn(event) {
        const APPROVED = 'Approved';

        if(empAccValue.Status_of_Account__c === APPROVED) {
            window.alert('test');
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Oh no!',
                    message: 'Your account is not approved for use.',
                    variant: 'error'
                })
            );
        }
        return this.handleInput = event.detail.value;
    }


    // wiredRecord({data, error}) {
    //     if(data) {
    //         const {fields} = data
    //         Object.keys(fields).forEach(item=> {
    //             let value = fields[item] && fields[item].displayValue ? fields[item].displayValue : fields[item].value
    //             this.result = { ...this.result, [item]:value}
    //         })
    //         console.log(JSON.stringify(data))
    //     } 
    //     if(error) {
    //         console.error(error)
    //     }
    // }
 
}