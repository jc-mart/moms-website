
document.addEventListener("DOMContentLoaded", function () {
    const appId = '260399937032656';
    const pageId = 'cognewhope';
    const accessToken = 'EAADs1RWZCEdABOx8etASKFqvWeHQGXvYKctRRgZCT3CL6G4lspZCT4mACkY5tHm6h1bYswK9uMBatCjFpdiKXEB60208nooHJw7TTeHTp5XWHzZBimmb1K24luVV54pmv2FlAZBaOfeDTN0Yd6b27ZCkNe2hRqJY6TW1ikEiYsv87EIBMIGs2M3Tm9AZAVelgL9dwZCu2shLZAlre4qd2tZAl5bZAviWPMZD';

    async function getMostRecentLivestreamVideoId() {
        try {
            const response = await fetch(`https://graph.facebook.com/v15.0/${pageId}/videos?fields=id&limit=1&access_token=${accessToken}`);
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                return data.data[0].id;
            }
        } catch (error) {
            console.error('Error fetching livestream video ID:', error);
        }

        return null;
    }

    async function createLivestreamPlayer() {
        const videoId = await getMostRecentLivestreamVideoId();

        if (videoId) {
            const embedCode = `
                <div class="fb-video" data-href="https://www.facebook.com/${pageId}/videos/${videoId}/" data-width="auto" data-show-text="false">
                    <blockquote cite="https://developers.facebook.com/${pageId}/videos/${videoId}/" class="fb-xfbml-parse-ignore">
                        <a href="https://developers.facebook.com/${pageId}/videos/${videoId}/">Watch latest livestream</a>
                        <p>Latest livestream from Our Church</p>
                    </blockquote>
                </div>
            `;

            document.getElementById('livestream').innerHTML = embedCode;

            if (window.FB) {
                window.FB.XFBML.parse();
            }
        } else {
            document.getElementById('livestream').innerHTML = 'No livestream available.';
        }
    }

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=' + appId + '&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        createLivestreamPlayer();
    };
});
