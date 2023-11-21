void Bit_3D_Rotation(int Round) {
  tempStr="";
  RowTemp[0]="";
  RowTemp[1]="";
  RowTemp[2]="";
  RowTemp[3]="";
  OutputS="";

  cout<<"=====>>> Bit_3D_Rotation"<<endl;

  for(int j=0;j<16;j++) {
    tempStr=tempStr+Row[0].at(Plaintext_3D_0[j]);
  }

  RowTemp[0]=RowTemp[0]+tempStr;
  Row[0]=RowTemp[0];
  tempStr="";

  for(int j=0;j<16;j++) {
    tempStr=tempStr+Row[1].at(Plaintext_3D_1[j]);
  }
  RowTemp[1]=RowTemp[1]+tempStr;
  Row[1]=RowTemp[1];tempStr="";

  for(int j=0;j<16;j++) {
    tempStr=tempStr+Row[2].at(Plaintext_3D_2[j]);
  }
  RowTemp[2]=RowTemp[2]+tempStr;
  Row[2]=RowTemp[2];
  tempStr="";

  for(int j=0;j<16;j++) {
    tempStr=tempStr+Row[3].at(Plaintext_3D_3[j]);
  }
  RowTemp[3]=RowTemp[3]+tempStr;Row[3]=RowTemp[3];
  tempStr="";

  for(int i=0;i<4;i++) {
    cout<<"Row_B["<<i<<"]:"<<Row[i]<<endl;
  }
  cout<<endl;
  
  for(int i=0;i<4;i++) {
    OutputS=OutputS+Row[3-i];
  }
}
