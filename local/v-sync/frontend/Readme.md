Vsync - Frontend documentation
frontend/src : all the main things start from here
/api/axios/BASE_URL : it's the domain url that all the api’s used in the project will go to.
/assets : contains all the images and videos

/components/dashboard
Audio: noninstant Audio’s component , contains all audio related code.
AudioInstant : contains all the audio code of instant
Payment: previous QR code component , not in use at present
PaymentRedirection: component which checks whether the payment was successful or not, the check can be removed from here only that redirection further would only happen if payment is Success
Questions : questions component for noninstant
QuestionInstant :  questions component for instant
Recorder : not in use, but contains the js code of recording the audio, it’s the same function which is applied in Audio,but is not in use.
Result: dashboard’s vsync page, currently this is used for both instant and not instant
ResultInstant : not in use , dashboard’s vsync page for instant, was in use when payment gateway wasn’t added.
Selfie: the dashboard component which displays selfie’s of both the user, this is for noninstant
SelfieInstant: the dashboard component which displays selfie’s of both the user, this is for instant
Spectrogram : The spectrogram pop-up
SpectrogramDetails : The spectrogram pop-up redirects to this component, when link in the popup is clicked
VoiceBar: the bar that comes when audio is recorded.

/components
ClickPic : the page where the user clicks picture
Contact : the footer at landing page
CTA : the section where cards appear
Dashboard: The component which loads other dashboard components, contains all the states and functionality of checking whether it’s instant or not.
EnterCode: the pop up for join on the gametype page.
Error : the 404 type of page that opens when an unauthorized page is tried to access.
FinalBar : the bar component for the last page where correlation is displayed.
FinalResult: finalResult component for noninstant.
FinalResultInstant : finalResult component for instant.
GameCard: the cards component that is then used in CTA.
GameType :  the gameType page which shows host,join,instant
GiveCode: the pop-up when host is clicked on gameType page
HealthQuestions : the health related questions that are asked when the user login for the first time.
 Hero: the component where V-sync,vaani,vibes,verve pics and content is there.
Home: the whole landing page is put together in this one.
Index: not in use made earlier to keep the app more organized
InstantInfo_form : the form that asks user’s information for when instant game type is chosen
InstantUserInfo: The page that has the option to enter both user’s details when an instant game is opted.
Loader : The chatgpt styled page
Login : the outer component that contains both sign-in and sign-up form.
Logout: the pop-up that is displayed when logout is clicked
Navbar: the navbar
RequireAuth: the component which ensures that the user’s with access token are only able to access the pages that need authentication.
SignInForm : the sign form
SignUpForm : the signUp form
Testing : an empty component to test anything can be accessed by url : BASE_URL/test

/context
AuthProvider : the react context to use useAuth hook efficiently.
/hooks
useAuth : hook for authorization
useAxiosPrivate : not in use, but made to access the authorized and unauthorized pages easily
/utils
audio;audioRecord;audioTest;audioVoiceRecorder;permission : not in use, tested code but didn’t work for recording audio.
takeScreenshot : function to take screenshot on , not in use , did.’t work.

Rest files are react files only and tailwind config files, all the field mentioned here follow the commonly used naming convention.

	

