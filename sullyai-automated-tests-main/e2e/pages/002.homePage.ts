import { test, expect, type Locator, type Page, type Browser } from '@playwright/test';
import locators from '../locators/locators';
import { loginPage } from './001.loginPage';


export class homePage {


    readonly page: Page;
    readonly userProfile: Locator;
    readonly patientDropdown: Locator;
    readonly startRecBtn: Locator;
    readonly pauseRecBtn: Locator;
    readonly writeTranscript: Locator;
    readonly generateNoteBtn: Locator;
    readonly patientNotes: Locator;
    readonly patientNoteHeading: Locator;
    readonly visitsTab: Locator;
    readonly notesTab: Locator;
    readonly dataCheckBox: Locator;
    readonly providerCheckBox: Locator;
    readonly acceptConsentBtn: Locator;
    readonly patientFirstName: Locator;
    readonly patientLastName: Locator;
    readonly patientPhone: Locator;
    readonly patientEmail: Locator;
    readonly patientAddress: Locator;
    readonly patientState: Locator;
    readonly patientZip: Locator;
    readonly patientBirthDate: Locator;
    readonly patienProfileKebabMenu: Locator;
    readonly patientprofileButton: Locator;
    readonly settingsTab: Locator;



    constructor(page: Page) {
        this.page = page;
        this.userProfile = page.getByText('qa.sullyai@gmail.com');
        this.patientDropdown = page.locator('.welcome-select-container').locator('input');
        this.startRecBtn = page.getByRole('button', { name: 'Start Recording' });
        this.pauseRecBtn = page.getByRole('button', { name: 'Pause' });
        this.writeTranscript = page.getByPlaceholder('You can see the transcript');
        this.generateNoteBtn = page.getByRole('button', { name: 'Generate Note' });
        this.patientNotes = page.locator('div').filter({ hasText:`${locators.patientName}` }).first();
        this.patientNoteHeading = page.getByRole('heading', { name: `${locators.patientName}\'s Notes` });
        this.notesTab = page.getByRole('link', { name: 'Notes' });
        this.dataCheckBox = page.getByTestId('tos-checkbox');
        this.providerCheckBox = page.getByTestId('provider-checkbox');
        this.acceptConsentBtn = page.getByTestId('accept-consent-button');
        this.patienProfileKebabMenu = page.locator('.d-flex > .dropdown > div > .d-flex');
        this.patientprofileButton = page.getByRole('button', { name: 'Patient Profile' });
        this.patientFirstName = page.locator('input[name="firstName"]');
        this.patientLastName = page.locator('input[name="lastName"]');
        this.patientPhone = page.locator('input[name="phone"]');
        this.patientEmail = page.locator('input[name="email"]');
        this.patientAddress = page.locator('input[name="address"]');
        this.patientState = page.locator('input[name="state"]');
        this.patientZip = page.locator('input[name="zip"]');
        this.settingsTab = page.getByRole('button').nth(2);


        
    }

    // async firstTimeUserSignIn() {

    //     await this.dataCheckBox.check();
    //     await this.providerCheckBox.check();
    //     await this.acceptConsentBtn.click();
    // }

    // async createProviderProfile() {

    //     await this.page.waitForTimeout(10000);
    //     await expect(this.page.locator('input[name="firstname"]')).toBeVisible();
    //     await this.page.locator('input[name="firstname"]').click();
    //     await this.page.locator('input[name="firstname"]').fill('first');
    //     await this.page.locator('input[name="firstname"]').press('Tab');
    //     await this.page.locator('input[name="lastname"]').fill('last');
    //     await this.page.locator('input[name="lastname"]').press('Tab');
    //     await this.page.locator('input[name="phone"]').fill('98997801256');
    //     await this.page.locator('input[name="phone"]').press('Tab');
    //     await this.page.locator('select[name="type"]').selectOption('individual');
    //     await this.page.locator('select[name="type"]').press('Tab');
    //     await this.page.locator('input[name="organization"]').fill('Org');
    //     await this.page.locator('input[name="organization"]').press('Tab');
    //     await this.page.locator('div').filter({ hasText: /^Type or select Speciality\.\.\.$/ }).nth(1).click();
    //     await this.page.getByText('Cardiology', { exact: true }).click();
    //     await this.page.locator('div').filter({ hasText: /^Type or select EHR\.\.\.$/ }).nth(3).click();
    //     await this.page.getByText('AthenaHealth', { exact: true }).click();
    //     // await this.page.locator('input[name="address"]').click();
    //     // await this.page.locator('input[name="address"]').fill('Street 01');
    //     // await this.page.locator('input[name="address"]').press('Tab');
    //     // await this.page.locator('input[name="city"]').fill('City');
    //     // await this.page.locator('input[name="city"]').press('Tab');
    //     // await this.page.locator('input[name="state"]').fill('State');
    //     // await this.page.locator('input[name="state"]').press('Tab');
    //     // await this.page.locator('input[name="zip"]').fill('90054');
    //     await expect(this.page.locator('form').filter({ hasText: 'Provider ProfileFirst' }).getByRole('button')).toBeVisible();
    //     await this.page.locator('form').filter({ hasText: 'Provider ProfileFirst' }).getByRole('button').click();

    // }

    async validateUserProfile() {
        await this.page.locator("//p[@class='m-0 text-body1']").click();
        await this.page.getByRole('button', { name: 'Profile', exact: true }).click();
        await expect(this.page.getByText('Provider Profile')).toBeVisible();
    }

    async createScribe() {

       await this.patientDropdown.click();
       await this.patientDropdown.fill(locators.patientName);
       await this.patientDropdown.press('Enter');
       await this.page.waitForTimeout(2000);
       await this.startRecBtn.click();
       await this.writeTranscript.fill(locators.userStory);
       await this.generateNoteBtn.click();

       await this.page.waitForTimeout(20000);
       await this.page.waitForLoadState('networkidle');
    
        
    }

    async checkPauseAndResumeBtn() {
        
        await this.patientDropdown.click();
        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await this.page.waitForTimeout(3000);
        await this.startRecBtn.isEnabled();
        await this.startRecBtn.click();
        await this.page.waitForTimeout(3000);

        await this.pauseRecBtn.isEnabled();
        await this.page.waitForTimeout(3000);
        await this.pauseRecBtn.click();
        await this.page.close();
    }

    async checkPatientNotes() {


        await this.notesTab.click();
        await expect(this.page.getByText('Today')).toBeVisible({timeout: 120000});

        //await expect(this.page.getByText('patient automation')).toBeVisible();
        
        await this.page.waitForTimeout(2000);                                      // Added wait since its getting time to load the lists
        await this.page.locator("(//p[@id='note-item-head-title'])[1]").click()    // Changed Locator for Patient Note on Top 
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByRole('textbox')).toContainText('Patient Instructions:');      //Text changed

}

    async createPatientProfile() {

        const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000).toString(); // create random zip code

        await this.notesTab.click();

        await this.patienProfileKebabMenu.nth(1).click(); //add index to kebebMenu Locator
        await this.patientprofileButton.click();

// selects the first patient in the list
        await this.page.locator('a').filter({ hasText: 'Edit' }).nth(1).click();

        await this.patientFirstName.click();
        await this.patientFirstName.fill(locators.patientFirstName);
        await this.patientFirstName.press('Tab');
        await this.patientLastName.fill(locators.patientLastName);
        await this.patientLastName.press('Tab');
        await this.patientPhone.fill(locators.patientPhone);
        await this.patientPhone.press('Tab');
        await this.patientEmail.fill(locators.patientEmail);
        await this.patientEmail.press('Tab');
        await this.patientAddress.fill(locators.patientAddress);
        await this.patientAddress.press('Tab');
        await this.patientState.fill(locators.patientState);
        await this.patientState.press('Tab');
        await this.patientZip.fill(randomSixDigitNumber); //passed random six digit number to Zip code
        //await this.patientZip.press('Tab');

        // the below code for datepicker is not working
       // await this.page.locator("//label[text()='Birth Date']").click();
        await this.page.locator("(//input[@type='text'])[2]").fill('19/11/1965'); //added locator for date picker

        await this.page.getByRole('button', { name: 'Save' }).click();

        // assertion to check whether the patient profile has been updated
        await expect(this.page.getByText('Patient profile update')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();


    }

    async editNotes() {
        
        await this.notesTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.patientNotes).toBeVisible();

        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);

        // await this.page.getByRole('heading', { name: 'CC(s):' }).click();
        await this.page.getByRole('heading', { name: 'CC(s):' }).fill('CC(s): Text added to see whether notes are being updated or not.');
        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('networkidle');
        // await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async navigateToNotestab() {
        
        await this.notesTab.click();
        // await this.patientNotes.click();
    }


    async verifyNotesEdits() {
        
        await this.notesTab.click({timeout:30000});
        // await expect(this.patientNotes).toBeVisible({timeout:30000});
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();

        await this.page.waitForTimeout(5000);
        await expect(this.page.locator('(//div[@class="_contentEditable_16b3d_340 report-rich-text"])[1]')).toBeVisible({ timeout: 30000 });

    }

    async checkAndSaveDiagnosis() {
        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        //await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).fill("patient automation");
        //await this.page.getByText('patient automation', { exact: true }).click();
        //await this.page.locator("//div[@id='react-select-3-placeholder']").click();
       
       // await this.page.getByText('Select patient...').click();
        await this.page.locator('.css-19bb58m').click();
        await this.page.locator('#react-select-3-input').fill('patient automation');
        await this.page.locator('#react-select-3-input').press('Enter');
        // await this.page.locator('.css-8mmkcg').first().click();
        // await this.page.locator('svg').nth(1).click();
        // await this.page.locator('#react-select-3-option-0').click();
        //await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        // await this.page.getByText('DDx:').click();
        // await this.page.locator('p').filter({ hasText: 'DDx:' }).click();
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('networkidle');
        
        await this.page.getByText('DDx:').fill('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes');

        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    // async updateDiagnosis() {
    //     await this.page.getByRole('link', { name: 'Diagnosis' }).click();
    //     await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(3).click();
    //     await this.page.getByText('patient automation', { exact: true }).click();
    //     await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled();
    //     // await this.page.getByText('DDx:').click();
    //     // await this.page.locator('p').filter({ hasText: 'DDx:' }).click();
    //     await this.page.getByText('DDx:').fill('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes');

    //     await this.page.waitForTimeout(1000);

    //     await this.page.getByRole('button', { name: 'Save' }).click();
    //     await this.page.waitForLoadState('networkidle');
    // }

    async validateDiagnosisUpdate() {

        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        // await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        // await this.page.getByText('patient automation', { exact: true }).click();
        await this.page.locator('.css-19bb58m').click();
        await this.page.locator('#react-select-3-input').fill('patient automation');
        await this.page.locator('#react-select-3-input').press('Enter');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible();
        await expect(this.page.getByText('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes')).toBeVisible({timeout: 30000});
        

    }



    async sendMailFromDiagnosis() {

        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();

        this.page.getByRole('button', { name: 'Send', exact: true }).click();

        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('Send Diagnosis Report');
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('qa.sully.ai@gmail.com');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();


    }



    async checkAndSavePlans() {
        await this.page.getByRole('link', { name: 'Plans' }).click();
        // await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        // await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        // await this.page.locator('svg').nth(1).click();
        // await this.page.locator('#react-select-3-option-0').click();
        await this.page.locator('.css-19bb58m').click();
        await this.page.locator('#react-select-3-input').fill('patient automation');
        await this.page.locator('#react-select-3-input').press('Enter');
        await this.page.waitForTimeout(3000);
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        await this.page.waitForLoadState('networkidle');

        await this.page.locator("//div[@role='textbox']").fill('Suggested Clinical Plan: Text added in plans to test whether the user is able to update plans notes');
        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }



    async validatePlansUpdate() {

        await this.page.getByRole('link', { name: 'Plans' }).click();
        // await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        // await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        // await this.page.locator('svg').nth(1).click();
        // await this.page.locator('#react-select-3-option-0').click();
        await this.page.locator('.css-19bb58m').click();
        await this.page.locator('#react-select-3-input').fill('patient automation');
        await this.page.locator('#react-select-3-input').press('Enter');
        await this.page.waitForTimeout(3000);
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible();
        await expect(this.page.getByText('Suggested Clinical Plan: Text added in plans to test whether the user is able to update plans notes')).toBeVisible({timeout: 30000});
        

    }

    async sendEmailsFromPlans() {

        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();

        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('Send Diagnosis Report');
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('qa.sully.ai@gmail.com');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();


    }

    async checkAndSavePrescription() {
        await this.page.getByRole('link', { name: 'Prescription' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Prescription and medication plan:').fill('Prescription and medication plan: Text added in plans to test whether the user is able to update prescriptions');
        await this.page.waitForTimeout(1000);

        await expect(this.page.getByRole('button', { name: 'Order Prescription' })).toBeVisible();

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async validatePrescriptionUpdate() {

        await this.page.getByRole('link', { name: 'Prescription' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible({timeout:10000});
        await expect(this.page.getByText('Prescription and medication plan: Text added in plans to test whether the user is able to update prescriptions')).toBeVisible({timeout: 30000});
        

    }

    async deleteNotes() {
          // await this.patientNotes.click();
        await this.page.waitForTimeout(3000);
        await this.page.getByText('patient automation').first().click();
        await this.page.waitForTimeout(3000);
        
          //await this.page.locator('#editor-containertGRwk8Mud8').getByRole('button').nth(1).click();
        await this.page.locator("//div[@class='more-btn']").click();

        await this.page.locator("//button[text()=' Delete Recording']").click()
          
        //   /copilot/assets/dots-vertical-cc709831.svg
  
        //   await this.page.locator("(//i[@class='bi bi-three-dots-vertical d-block m-0 menu-btn'])[1]").click()  // Changed locator xpath for action button and Delete Patient Button
  
        //   await this.page.locator("//a[text()='Delete Patient']").click()
  
          //await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async navigateToSettings() {

        await this.page.locator("//div[@class='header-icon-container']").click();
        await this.page.waitForTimeout(10000);
    //    await expect(this.page.locator("//div[@class='ml-1 text-h4' and text() = 'Settings']")).toBeVisible();

    }

    async enableEmailMeTheNotes() {

       // await this.page.getByText('General').click();
        await this.page.locator("//span[@class='slider round']").nth[2].click();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill(locators.userEmail);
        await this.page.getByLabel('Profile').locator('label span').click();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await this.page.locator('div').filter({ hasText: /^Copilot Settings$/ }).locator('path').click();

        await expect(this.page.locator('#root')).toContainText(locators.userEmail);
    }

    async loginToDrChrono() {


    await this.page.goto('https://app.drchrono.com/accounts/login/');
    await this.page.getByPlaceholder('Username').click();
    await this.page.getByPlaceholder('Username').fill('shubhamb');
    await this.page.getByRole('button', { name: 'Continue' }).click(); // added continue button locator
    await this.page.getByPlaceholder('Password').click();
    await this.page.getByPlaceholder('Password').fill('drchrono@12347890');
    await this.page.getByRole('button', { name: 'Log In' }).click();

    }

    async connectToDrChrono() {

        const isConnected = this.page.getByRole('link', { name: 'Connected to' });

        if(await isConnected.isVisible()){

            await this.disconnectDrChrono();
            await this.navigateToSettings();

        }

        await this.page.getByText('Integrations').click();
        await this.page.getByRole('link', { name: 'Connect to Connect to DrChrono' }).click();
        await this.page.locator('#org_id').click();
        await this.page.locator('#org_id').fill('parikhhealth');
        const page4Promise = this.page.waitForEvent('popup', {timeout: 30000});
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Connect to DrChrono' }).click();
        const page4 = await page4Promise;
       // await this.page.locator('.css-19bb58m').click();
        await page4.getByPlaceholder('Username').click();
        await page4.getByPlaceholder('Username').fill('shubhamb');
        await page4.getByRole('button', { name: 'Continue' }).click(); // added continue button locator
        await page4.getByPlaceholder('Password').click();
        await page4.getByPlaceholder('Password').fill('drchrono@12347890');
        await page4.getByRole('button', { name: 'Log In' }).click();
       // await page4.locator("//input[@id='react-select-2-input']").fill("Chaitanya Gharpure");
        await page4.getByRole('button', { name: 'Done' }).click();
        await expect(page4.getByRole('link', { name: 'Visits' })).toBeVisible();

    }

    async disconnectDrChrono() {
        await expect(this.page.getByRole('link', { name: 'Connected to' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Connected to' }).click();
        await expect(this.page.locator('#root')).toContainText('Connect DrChrono to Sully.aiqa.sully.ai@gmail.comCongratulations! Your DrChrono account is now superpowered with Sully.aiSelect doctor...DisconnectDone');
        await this.page.getByRole('button', { name: 'Disconnect' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();

    }

    async addNotesStyle() {

        await this.page.locator("//span[@class='ms-2'and text()='Note Style']").click();


        await this.page.getByRole('combobox').first().selectOption('custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'OK' }).click();
        
        let formcontrol = await this.page.locator("//input[@class='form-control']");
        formcontrol.click();
        await this.page.locator("//input[@class='form-control']").fill('Sample test');
        let dropdowncomp= await this.page.locator("//select[@class='dropdown-component']").nth[1];
        dropdowncomp.click();
        
        await this.page.locator("//option[value='apso']");
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Save & Set as Default', exact: true }).click();

    }

    async deletePatient() {
        await this.patienProfileKebabMenu.nth(1).click();  //changed locator of patient profile

        await this.page.getByRole('button', { name: 'Delete Patient' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async deleteAccount() {

        await this.page.locator("//button[text()='Delete']").click();

        
    }

    async submitfeedback() {
        // await this.page.getByRole('link', { name: 'Feedback' }).click();
        await expect(this.page.getByRole('button', { name: 'Send Feedback Send Feedback' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send Feedback Send Feedback' }).click();
        await this.page.locator('input[name="subject"]').click();

        await this.page.locator('input[name="subject"]').fill('patient automation feedback');
        await this.page.locator('input[name="subject"]').press('Tab');
      //  await this.page.locator('input[name="phone"]').fill('9899780176'); // Commented out this line as phone number field is not present
        await this.page.locator('textarea[name="message"]').click();
        await this.page.locator('textarea[name="message"]').fill('Test Message');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator("//div[@class='popup-body modal-body']")).toContainText("Your feedback has been shared with the team, you'll recieve a confirmation email shortly."); //changed locator and confirmation message
        await this.page.getByRole('button', { name: 'OK' }).click();
        
    }

    async callSupport() {

        // await this.page.getByRole('link', { name: 'Support', exact: true }).click();

        await this.page.getByRole('button', { name: 'Support Available 24/7 Support' }).click();
        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('patient automation contact support');
        await this.page.locator('input[name="subject"]').press('Tab');
        await this.page.locator('input[name="phone"]').fill('9899780179');
        await this.page.locator('textarea[name="message"]').click();
        await this.page.locator('textarea[name="message"]').fill('User\'s complain about crashed UI');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator("//div[@class='popup-body modal-body']")).toContainText('Your request has been submitted to our support team, you\'ll recieve a confirmation email shortly.'); //changed locator of dialog box
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async signOut() {

        await this.page.locator('.initials-avatar').click();
        await expect(this.page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
    }

    async switchingTabsScenario() {
        
        //await this.page.locator('div').filter({ hasText: /^Add or select patient\.\.\.$/ }).nth(2).click();
      //  await this.page.locator('div').filter({ hasText: /^Add or select patient\.\.\.$/ }).nth(2).fill('patient automation');
       // await this.page.locator("//div[text()='Add or select patient...']").click();
        await this.page.locator("//input[@id='react-select-2-input']").fill('patient automation');
        await this.page.keyboard.press('Enter');
      //  await this.page.getByText('patient automation', { exact: true }).click();
        await this.page.locator("//button[@class='recording-action-btn btn btn-primary']").click();
       // await this.page.getByRole('link', { name: 'Notes' }).click();
       // await expect(this.page.locator('#root')).toContainText('patient automation');
       // await this.page.getByRole('link', { name: 'Visits' }).click();
        await expect(this.page.locator("//button//span[text()='Pause']")).toContainText('Pause');
        await expect(this.page.locator("//button//span[text()='Generate Note']")).toContainText('Generate Note');
        await expect(this.page.locator('#root')).toContainText('patient automation');

    }

    async settingsPageUIValidation(){

        await expect(this.page.getByText('Integrations' )).toBeVisible();
        await expect(this.page.getByText('General')).toBeVisible();
        await expect(this.page.getByText('Note Style')).toBeVisible();
        await expect(this.page.getByText('Scribe Rules')).toBeVisible();
       // await expect(this.page.getByRole('link', { name: 'Connect to DrChrono' })).toBeVisible();
        // await expect(this.page.getByRole('link', { name: 'Connect to athenahealth' })).toBeVisible();
        //const image = await this.page.locator("//img[@src='/copilot/assets/ecw-b72151d3.png' and @alt='Connect to Elation' and contains(@class, 'ecw-icon')]");
      //  await expect(image).toBeVisible();   //change locator for Connect to Elation
       // await expect(this.page.getByRole('link', { name: 'Connect to Cerner' })).toBeVisible();
        //await expect(this.page.getByRole('link', { name: 'Connect to Epic' })).toBeVisible();
        await expect(this.page.getByText('Other Templates')).toBeVisible();
        //await expect(this.page.locator("//p[@class='setting-name text-subtitle2 color-primary-500' and text()='Feedback']")).toBeVisible();//change locator for feedback
        // await expect(this.page.getByRole('link', { name: 'Support' }).nth(1)).toBeVisible();
        // await expect(this.page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
        // await expect(this.page.getByRole('link', { name: 'Version' })).toBeVisible();

    }


    // async feedbackpageUiValidation(){
        

       
    //     await this.page.locator("//div/p[text()='Feedback']").click();//change locator for feedback

    //    // await expect(this.page.getByText('Provide Feedback')).toBeVisible();
    //     await expect(this.page.locator("//span[text()='Available 24/7']")).toBeVisible(); //changed locator for Available 24/7
    //     await expect(this.page.locator("//div//p[text()='Call or Text']")).toBeVisible(); //changed locator for Call or text

    //     await expect(this.page.locator("//div//p[text()='Whatsapp']")).toBeVisible(); //changed locator for Whatsapp
    //     await expect(this.page.getByRole('link', { name: 'Email Support@sully.ai' })).toBeVisible();
    //     await expect(this.page.getByRole('link', { name: 'Schedule a meeting Book a' })).toBeVisible();
    //     await expect(this.page.getByText('Submit a support ticket')).toBeVisible();  //changed text
    //     await expect(this.page.locator('input[name="subject"]')).toBeVisible();
    //     await expect(this.page.locator('input[name="phone"]')).toBeVisible();   
    //     //await this.page.locator('form i').hover();
    //   //  await expect(this.page.getByText('if you provide a contact')).toBeVisible();
    //     await this.page.locator('textarea[name="message"]').click();
    //     await expect(this.page.locator('textarea[name="message"]')).toBeVisible();
    // }

    async submitFeedbackForNotes(){

        await this.notesTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.patientNotes).toBeVisible();

        await this.page.getByText('patient automation').first().click();
        await this.page.waitForTimeout(3000);
        await expect(this.page.locator("(//div//p[text()='Rate this note'])[1]")).toBeVisible();  //Changed locator for Rate this now text
        await this.page.locator('form').getByRole('img').nth(4).click();
        await expect(this.page.locator("(//div//p[text()='Tell us more'])[1]")).toBeVisible();    //Change locator for Tell us more text
        await this.page.locator("(//div//textarea[@name='feedback'])[1]").click();               //Change locator for feedack
        await this.page.locator("(//div//textarea[@name='feedback'])[1]").fill('review message');
        await expect(this.page.getByRole('button', { name: 'Send Feedback', exact: true })).toBeVisible();

        await this.page.getByRole('button', { name: 'Send Feedback', exact: true }).click();

    }

    async addScribeRules() {
        await this.page.getByText('Scribe Rules').click();
        await this.page.waitForTimeout(1000);
        //await expect(this.page.locator("//button[@class='btn main-btn d-flex align-tem-center text-dark border-0 undefined '']")).toBeVisible();
        let addrule= await this.page.getByText('Add Rule');
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('button', { name: 'Add Rule' }).click();
        await this.page.waitForTimeout(5000);

        await this.page.getByPlaceholder('When I say...').click();
        await this.page.getByPlaceholder('When I say...').fill(locators.scribeRulesKey1);

        await this.page.waitForTimeout(3000);
        await this.page.getByPlaceholder('replace with...').click();

        await this.page.getByPlaceholder('replace with...').fill(locators.scribeRules1);
        // await this.page.getByRole('button', { name: 'Add Rule' }).click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #2' }).locator('div').click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #2' }).locator('div').fill(locators.scribeRulesKey2);
        // await this.page.locator('dl').filter({ hasText: 'Rule #2' }).getByPlaceholder('replace with...').click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #2' }).getByPlaceholder('replace with...').fill(locators.scribeRules2);
        // await this.page.getByRole('button', { name: 'Add Rule' }).click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #3' }).locator('div').click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #3' }).locator('div').fill(locators.scribeRulesKey3);
        // await this.page.locator('dl').filter({ hasText: 'Rule #3' }).getByPlaceholder('replace with...').click();
        // await this.page.locator('dl').filter({ hasText: 'Rule #3' }).getByPlaceholder('replace with...').fill(locators.scribeRules3);
        // await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(3000);
      //  await this.deleteScribeRules();

    }

    async validateScribeRulesInNotes(){
        await this.notesTab.click({timeout:30000});
        //await this.page.getByText('patient automation').first().click();
        await this.page.locator('.css-19bb58m').click();
        await this.page.locator('#react-select-3-input').fill('patient automation');
        await this.page.locator('#react-select-3-input').press('Enter');
        await this.page.waitForTimeout(15000);
        await this.page.locator("(//div//p[text()='patient automation'])[1]").click();
        await this.page.waitForLoadState();
        await expect(this.page.getByRole('textbox')).toContainText('Exam');
        await expect(this.page.getByRole('textbox')).toContainText('Result');
        await expect(this.page.getByRole('textbox')).toContainText('Plan');
        await expect(this.page.getByRole('textbox')).toContainText('Patient Instructions:');
    }

    async deleteScribeRules() {

        await this.page.locator("//button[@class='btn ms-1']").nth[1].click();
        await this.page.waitForTimeout(1000);

        //this.addScribeRules();

       // await this.page.getByRole('link', { name: 'Scribe Rules' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('dd').filter({ hasText: 'knee- normal PE\\nMSS: no' }).getByRole('button').click();
       // await this.page.locator('dd').filter({ hasText: 'posterior fascia, no pain' }).getByRole('button').click();
       // await this.page.locator('dd').filter({ hasText: 'Allergies: Use Zyrtec or' }).getByRole('button').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async functionalityOfReloadButton(){
        await this.patientDropdown.click();
        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await this.page.waitForTimeout(2000);
        //await this.startRecBtn.click();


        await this.page.locator("//span[text()='Start Recording']").click()
        await this.page.waitForTimeout(2000);
        //await this.page.locator("//span[text()='Pause']").click();

        // reload button
        await this.page.locator('div').filter({ hasText: /^patient automation View Patient$/ }).getByRole('button').nth(1).click();

        await this.page.getByRole('button', { name: 'OK' }).click();


     }

     async createAutomations() {
        // await this.page.getByRole('link', { name: 'Automations', exact: true }).click();

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();
        await expect(this.page.getByText('Create Automation')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'What would you like to' })).toBeVisible();

        await this.page.locator('#rule-speech-input').click();
        await this.page.locator('#rule-speech-input').fill('When I say "follow up in 2 weeks" send an SMS to the patient to schedule an appointment.');
        await this.page.getByText('Generate').click();
        await expect(this.page.getByRole('heading', { name: 'Here\'s your automation!' })).toBeVisible();
        await expect(this.page.getByText('Reorder or edit the steps')).toBeVisible();
        await expect(this.page.getByText('Step 1:')).toBeVisible();
        await expect(this.page.getByText('Step 2:')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Submit Automation' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit Automation' }).click();

     }

     async checkAutomations() {

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();

        await expect(this.page.getByRole('link', { name: 'My Automations' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Automations' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByRole('button', { name: 'Automation #1', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();

     }

     async deleteMyAutomation() {

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();
        await expect(this.page.getByRole('link', { name: 'My Automations' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Automations' }).click();
        await this.page.getByRole('button', { name: 'Automation #1', exact: true }).getByRole('button').click();
        await expect(this.page.getByText('Are you sure you want to')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        // await expect(this.page.getByRole('heading', { name: 'You don\'t have any' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();
        await expect(this.page.getByText('Create Automation')).toBeVisible();

     }

     async sendNotesReport() {
        await this.navigateToNotestab()
        // await this.patientNotes.click();
        await this.page.locator("(//div//p[@id='note-item-head-title'])[1]").click();  //changed locator of patient selection
        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');

        await expect(this.page.locator('form').filter({ hasText: 'IMPORTANT: This feature is' }).getByRole('button')).toBeVisible();
        await this.page.locator('form').filter({ hasText: 'IMPORTANT: This feature is' }).getByRole('button').click();
        await expect(this.page.getByText('Are you sure you want to send')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();


     }

     async consentScriptValidation(){

        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');



        await expect(this.page.locator('#root')).toContainText('IMPORTANT: Please remember to obtain verbal consent from patients before recording the visit using Sully.ai. [See sample script]');
        await this.page.getByRole('link', { name: '[See sample script]' }).click();
        await expect(this.page.getByRole('dialog')).toContainText('Patient consent script for AI scribe');
        await expect(this.page.getByText('Consent script: Before we')).toBeVisible();
        await this.page.getByLabel('Close').click();
     }

     async topRightSupportValidation() {

        await expect(this.page.getByRole('button', { name: 'Support Available 24/7 Support' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Support Available 24/7 Support' }).click();
        await expect(this.page.getByText('Contact Support')).toBeVisible();
     }

     async deleteCustomeNotesStyle(){

        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();

        await this.page.getByRole('combobox').first(). selectOption('test-automation-styled-notes');
        await this.page.waitForLoadState();
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await expect(this.page.getByRole('button', { name: 'Delete Note' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Note' }).click();
        await expect(this.page.getByText('Confirm')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async addPersonalizationForDiagnosis() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'Diagnosis' }).click();
        await this.page.locator('#left-tabs-example-tabpane-diagnosis_instructions').getByText('Add Instruction').click();
        await this.page.locator("//textarea[@name='diagnosis_instructions[0]']").click();
        await this.page.locator("//textarea[@name='diagnosis_instructions[0]']").fill('Wait for 5 minutes');
        await this.page.getByText('Save Changes').click();


     }

     async addPersonalizationForPlan() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'PLan' }).click();
        await this.page.locator('#left-tabs-example-tabpane-plan_instructions').getByText('Add Instruction').click();
        await this.page.locator("//textarea[@name='plan_instructions[0]']").click();
        await this.page.locator("//textarea[@name='plan_instructions[0]']").fill('Wait for 5 minutes');
        await this.page.getByText('Save Changes').click();

     }

     async addPersonalizationForPrescriptions() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'Prescription' }).click();
        await this.page.locator('#left-tabs-example-tabpane-prescriptions_instructions').getByText('Add Instruction').click();
        await this.page.locator("//textarea[@name='prescriptions_instructions[0]']").click();
        await this.page.locator("//textarea[@name='prescriptions_instructions[0]']").fill('Wait for 5 minutes');
        await this.page.getByText('Save Changes').click();
     }

     async addPersonalizationForAssistant() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'Assistant' }).click();
        await this.page.locator('#left-tabs-example-tabpane-assistant_instructions').getByText('Add Instruction').click();
        await this.page.locator("//textarea[@name='assistant_instructions[0]']").click();
        await this.page.locator("//textarea[@name='assistant_instructions[0]']").fill('Wait for 5 minutes');
        await this.page.getByText('Save Changes').click();


     }

     async addPersonalizationForResearch() {Research

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'Research' }).click();
        await this.page.locator('#left-tabs-example-tabpane-research_instructions').getByText('Add Instruction').click();
        await this.page.locator("//textarea[@name='research_instructions[0]']").click();
        await this.page.locator("//textarea[@name='research_instructions[0]']").fill('Wait for 5 minutes');
        await this.page.getByText('Save Changes').click();
     }

     async deletePersonalizationForDiagnosis() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'Diagnosis' }).click();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByText('Save Changes').click();

     }

     async deletePersonalizationForPlan() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        // await this.page.getByRole('button', { name: 'PLan' }).click();await this.settingsTab.click();
        // await this.page.getByText('Personalization').click();
        await this.page.getByRole('button', { name: 'PLan' }).click();
        // await this.page.getByRole('tab', { name: 'Plan' }).click();
        // await this.page.waitForLoadState();
        // await expect(this.page.getByLabel('Plan')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByText('Save Changes').click();



     }

     async deletePersonalizationForPrescriptions() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        // await this.page.getByRole('button', { name: 'PLan' }).click();await this.settingsTab.click();
        await this.page.getByRole('button', { name: 'Prescription' }).click();
        // await this.page.waitForLoadState();
        // await expect(this.page.getByLabel('Prescriptions')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByText('Save Changes').click();


     }

     async deletePersonalizationForAssistant() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();
        // await this.page.getByRole('button', { name: 'PLan' }).click();await this.settingsTab.click();
        await this.page.getByRole('button', { name: 'Assistant' }).click();
        // await this.page.waitForLoadState();
        // await expect(this.page.getByLabel('Assistant')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByText('Save Changes').click();


     }

     async deletePersonalizationForResearch() {

        await this.settingsTab.click();
        await this.page.getByText('Personalization').click();

        await this.page.getByRole('button', { name: 'Research' }).click();
        // await expect(this.page.getByLabel('Research')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByText('Save Changes').click();


     }

     async addAlerts() {

        await expect(this.page.getByRole('link', { name: 'Alerts Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Alerts Alerts' }).click();
        await expect(this.page.getByText('Create Alert')).toBeVisible();
        await this.page.locator('#rule-speech-input').click();
        await this.page.locator('#rule-speech-input').fill('When a patient\'s blood pressure is higher than 140/90, send an SMS to me about it.');
        await this.page.getByText('Generate').click();
        await expect(this.page.getByRole('heading', { name: 'Here\'s your automation!' })).toBeVisible();
        await expect(this.page.getByText('Step 1:')).toBeVisible();
        await expect(this.page.getByText('Step 2:')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Submit Alert' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit Alert' }).click();
     }

     async checkCreatedAlerts() {
        await this.page.getByRole('link', { name: 'Alerts Alerts', exact: true }).click();  //Changed locator of Alerts link
        await expect(this.page.getByRole('link', { name: 'My Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Alerts' }).click();
        await expect(this.page.getByRole('button', { name: 'Alert #1', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();

     }

     async deleteCreatedAlerts() {

        await expect(this.page.getByRole('link', { name: 'Alerts Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Alerts Alerts' }).click();
        await expect(this.page.getByText('Create Alert')).toBeVisible();
        await this.page.getByRole('link', { name: 'My Alerts' }).click();
        await this.page.getByRole('button', { name: 'Alert #1', exact: true }).getByRole('button').click();
        await this.page.getByRole('button', { name: 'Alert #1', exact: true }).getByRole('button')
        await expect(this.page.getByText('Confirm')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.getByRole('button', { name: 'Close' }).click();
     }

     async checkPreviousNotesSummary() {
         
        await this.patientDropdown.click();
        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await this.page.locator("//button[text()='Pre-Visit']").click();    // Change assertion from Prevous-Visit to Pre-Visit
        await expect(this.page.getByRole('button', { name: 'Start Recording' })).toBeEnabled();

     }

     async addCustomTempForDiagnosis() {
        // await this.settingsTab.click();
        await this.page.getByText('Other Templates').click();

        // await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByText('Diagnosis Templates').click();
        await this.page.locator("(//select[@class='form-control'])[1]").click();
        await this.page.waitForTimeout(5000);
        await this.page.selectOption('.form-control',{label:'Create Custom'});
        //await this.page.locator("(//select//option[text()='Create Custom'])[1]").click();
        // await this.page.getByText('Default diagnosis template').click();  
        // await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template Automation');
        await this.page.waitForLoadState();
        // await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('networkidle');
        // await this.page.waitForTimeout(1000);

     }

     async addCustomTempForPlan() {
        await this.page.getByText('Other Templates').click();

        // await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByText('Plan Templates').click();
        await this.page.locator("(//select[@class='form-control'])[2]").click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(("//select//option[text()='Create Custom'])[1]")).click();

        
        //await this.page.locator("(//select//option[text()='Create Custom'])[1]").click();
        // await this.page.getByText('Default diagnosis template').click();  
        // await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template Automation');
        await this.page.waitForLoadState();
        // await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('networkidle');

     }


     async addCustomTempForPrescription() {
        await this.page.getByText('Other Templates').click();

        // await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByText('Prescription Templates').click();
        await this.page.locator("(//select[@class='form-control'])[3]").click();
        await this.page.waitForTimeout(5000);
        await this.page.selectOption('.form-control',{label:'Create Custom'});
        
        //await this.page.locator("(//select//option[text()='Create Custom'])[1]").click();
        // await this.page.getByText('Default diagnosis template').click();  
        // await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template Automation');
        await this.page.waitForLoadState();
        // await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('networkidle');


     }

     async deleteCustomTempForDiagnosis() {
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Diagnosis Templates' }).click();
        await this.page.getByLabel('Diagnosis Templates').getByRole('combobox').selectOption('Test Template Automation');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async deleteCustomTempForPlan(){
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Plan Templates' }).click();
        await this.page.getByLabel('Plan Templates').getByRole('combobox').selectOption('Test Template');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async deleteCustomTempForPrescription(){
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Prescription Templates' }).click();
        await this.page.getByLabel('Prescription Templates').getByRole('combobox').selectOption('Test Template');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async checkRegenerateBtnForNotes() {
        await this.notesTab.click({timeout:30000});
        // await expect(this.patientNotes).toBeVisible({timeout:30000});
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();
        await expect(this.page.getByRole('button', { name: 'Regenerate' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await expect(this.page.locator("(//div//textarea[@id='regenerate-instructions'])[1]")).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate Note' }).click();  //changed name
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.waitForTimeout(1000);

     }
     async checkRegenerateBtnForDiagnosis() {
        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-19bb58m').click();// changed locator for diagnosis dropdown
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').click();
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').fill('patient automation');
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').press('Enter');
        await this.page.getByRole('button', { name: 'Generate Diagnosis' }).click();
        // await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();   // Alert popup does not display
        // await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async checkRegenerateBtnForPlans() {
        await this.page.getByRole('link', { name: 'Plans' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-19bb58m').click();// changed locator for plan dropdown
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').click();
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').fill('patient automation');
        await this.page.locator('input[role="combobox"][aria-autocomplete="list"]').press('Enter');
        await this.page.getByRole('button', { name: 'Generate Clinical Plan' }).click();// Changed locator for Generate Clinical Plan
        // await expect(this.page.getByText('Alert', { exact: true })).toBeVisible(); //Alert popup does not display
        // await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async connectToCrcRehab() {

        await this.page.goto('https://crehab-emr-dev.web.app/login');
        await this.page.getByLabel('email').click();
        await this.page.getByLabel('email').fill('testclinician1@crehab.com');
        await this.page.locator("//input[@id='password']").click();
        await this.page.locator("//input[@id='password']").fill('temp12345');
        await this.page.waitForTimeout(3000);
        await this.page.locator("//button[@type='submit']").click();
        await expect(this.page.getByRole('heading', { name: 'Patients' })).toBeVisible();

        await this.page.goto(locators.baseUrl);
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');
        await this.page.locator('input[name="email"]').press('Tab');
        await this.page.locator('input[name="password"]').fill('P@ssw0rd');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();
        await expect(this.page.locator("//button[@class='header-icon']")).toBeVisible(); //changed locator for settings
        await this.page.locator("//button[@class='header-icon']").click();  //changed locator for settings
        await this.page.getByRole('link', { name:'Connect to CRC' }).click();  //changed locator
       // await this.page.waitForTimeout(2000); 
       // await this.page.waitForLoadState('networkidle');
        await this.page.locator('#org_id').click();
        await this.page.locator('#org_id').fill('crehabc');
        await this.page.getByRole('button', { name: 'Connect to Comprehensive Rehab Consultants' }).click(); // changed locator
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').press('Meta+a');
        await this.page.getByRole('textbox').fill('testclinician1@crehab.com');
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Done' }).click();
       // await this.page.waitForTimeout(1000);
       // await expect(this.page.locator('#root')).toContainText('New SNF Consult');
        



     }

     async disconnectCrcRehab() {

        await this.page.goto(locators.baseUrl);
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');
        await this.page.locator('input[name="email"]').press('Tab');
        await this.page.locator('input[name="password"]').fill('P@ssw0rd');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();
        await expect(this.page.locator("//button[@class='header-icon']")).toBeVisible(); //changed locator for settings
        await this.page.locator("//button[@class='header-icon']").click();  //changed locator for settings
       
        await expect(this.page.getByRole('link', { name: 'Connect to CRC' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Connect to CRC' }).click();
        await this.page.getByRole('button', { name: 'Disconnect' }).click();



     }







    



}