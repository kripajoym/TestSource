Dim myBinaryFormatter As BinaryFormatter = New BinaryFormatter();
myBinaryFormatter.Deserialize(stream);

Dim formatter As New LosFormatter();
formatter.Deserialize(fs);

Dim formatter As New LosFormatter(true, secret);
formatter.Deserialize(fs);


Dim ser As New NetDataContractSerializer;

Sub RegisterFormat(ByVal formatter As SoapFormatter)

End Sub