//Good Code
Dim winHttpHandler = new WinHttpHandler();
winHttpHandler.CheckCertificateRevocationList = True;

//BAD code

Dim winHttpHandler = new WinHttpHandler();
winHttpHandler.CheckCertificateRevocationList = False;

Dim winHttpHandler = new WinHttpHandler With {
	.CheckCertificateRevocationList = False;
}

ServicePointManager.CheckCertificateRevocationList = False