
# Image and Styling Processing

In order to process images, follow some instructions given in this document.

After creating and putting the image in the correct resource folders, you have to stop the emulator and run the command bellow:

```bash
$ tns prepare android
$ tns prepare ios
```

Now you can execute again the application:

```bash
$ tns run android --bundle
```

If you are getting general errors or the changes in source code are not being synchronized anymore with the emulator or you are getting the error message **Exception in thread "main" java.io.IOException**, try to execute the following commands:

```bash
$ rm -rf hooks
$ rm -rf platforms
$ rm -rf node_modules
$ rm webpack.config.js
$ rm package-lock.json
```

After this, run the command below in order to install the npm package. Some hooks and post install scripts will do the job to create some needed files and directories:

```bash
$ npm i
```

Now you can execute again the application:

```bash
$ tns run android --bundle
```

# How to create icons

1. Visit the Font Awesome website at https://fontawesome.com/icons?d=listing&m=free
1. Select an icon, selecting the options free + solid or regular
1. Click on the icon
1. Click on the link to download the svg file
1. Convert the svg file to png using Adobe Photoshop, for example
1. The png file must be a square, width = height = 1024 px
1. Upload the icon as png image at the website http://nsimage.brosteins.com
1. Click on the button "Upload App Icon"
1. Rename each file on the folders android and ios to the name you are going to use in you App
1. Copy the icons to the resource folders
1. Execute the steps described in the section "Image and Styling Processing"


# How to create images

1. Visit the site https://pixabay.com/ or get/create a png image
1. Certify that your image is using the png format
1. Upload the image at the website http://nsimage.brosteins.com
1. Select the option for iOS or Android
1. Click on the button "Upload App Image"
1. Copy the icons to the resource folders
1. Execute the steps described in the section "Image and Styling Processing"


# Useful Resources & Links

Official Styling Docs: https://docs.nativescript.org/angular/ui/styling

Official Theming Docs: https://docs.nativescript.org/angular/ui/theme

Official Icon Fonts Docs: https://docs.nativescript.org/angular/ui/icon-fonts

Official Image Docs: https://docs.nativescript.org/angular/ui/image-resources & https://docs.nativescript.org/angular/ui/ng-ui-widgets/image
