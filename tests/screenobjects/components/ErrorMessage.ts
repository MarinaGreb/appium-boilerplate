const SELECTORS = {
    ANDROID: {
        error_number_characters: '//android.widget.ScrollView[@content-desc="Login-screen"]//android.widget.TextView[2]',
        error_different_passwords: '//android.widget.ScrollView[@content-desc="Login-screen"]//android.widget.TextView[3]',
    },
    IOS: {
        ALERT: '-ios predicate string:type == \'XCUIElementTypeAlert\'',
    },
};

class ErrorMess {

    static async waitForErrPassShown (isShown = true) {
        const selector = driver.isAndroid
            ? SELECTORS.ANDROID.error_number_characters
            : SELECTORS.IOS.ALERT;

        return $(selector).waitForExist({
            timeout: 11000,
            reverse: !isShown,
        });
    }
        
        static async waitForErrDifferentPassShown (isShown = true) {
            const selector = driver.isAndroid
                ? SELECTORS.ANDROID.error_different_passwords
                : SELECTORS.IOS.ALERT;
    
            return $(selector).waitForExist({
                timeout: 11000,
                reverse: !isShown,
            });
        }

    static async textErrPass ():Promise<string> {
        if (driver.isIOS) {
            return driver.getAlertText();
        }

        return `${await $(SELECTORS.ANDROID.error_number_characters).getText()}`;
    }
    static async textErrDifferentPass ():Promise<string> {
        if (driver.isIOS) {
            return driver.getAlertText();
        }

        return `${await $(SELECTORS.ANDROID.error_different_passwords).getText()}`;
    }
}

export default ErrorMess;
