import TabBar from '../screenobjects/components/TabBar';
import LoginScreen from '../screenobjects/LoginScreen';
import NativeAlert from '../screenobjects/components/NativeAlert';
import ErrorMess from '../screenobjects/components/ErrorMessage';

describe('WebdriverIO and Appium, when interacting with a login form,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginScreen.waitForIsShown(true);
    });

    it('there is no way to login with a password of less than 8 characters', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: '123456' });
        // Wait for the alert and validate it
        await ErrorMess.waitForErrPassShown();
        await expect(await ErrorMess.textErrPass()).toEqual('Please enter at least 8 characters');

        // Close the alert
        // await NativeAlert.topOnButtonWithText('OK');
        // await NativeAlert.waitForIsShown(false);
    });

    it('should be able login successfully', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnLoginContainerButton();
        // Submit the data
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual('Success\nYou are logged in!');

        // Close the alert
        await NativeAlert.topOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });

    it('passwords during registration must match', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data
        await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password: 'Test1234!' , repeatPassword: 'Test123!' });
        // Wait for the alert and validate it
        await ErrorMess.waitForErrDifferentPassShown();
        await expect(await ErrorMess.textErrDifferentPass()).toEqual('Please enter the same password');

        // Close the alert
        // await NativeAlert.topOnButtonWithText('OK');
        // await NativeAlert.waitForIsShown(false);
    });

    it('should be able sign up successfully', async () => {
        // Always make sure you are on the right tab
        await LoginScreen.tapOnSignUpContainerButton();
        // Submit the data
        await LoginScreen.submitSignUpForm({ username: 'test@webdriver.io', password: 'Test1234!', repeatPassword: 'Test1234!' });
        // Wait for the alert and validate it
        await NativeAlert.waitForIsShown();
        await expect(await NativeAlert.text()).toEqual('Signed Up!\nYou successfully signed up!');

        // Close the alert
        await NativeAlert.topOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });
});
