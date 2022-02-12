
1. Get a dbc file from one of these sources and put it in
- https://github.com/joshwardell/model3dbc/blob/master/Model3CAN.dbc
- https://github.com/commaai/opendbc/blob/master/tesla_can.dbc
- https://github.com/onyx-m2/onyx-m2-dbc/blob/main/tesla_model3.dbc
- https://github.com/thezim/DBCTools/blob/master/Samples/tesla_model3.dbc

2. Install python

3. Install canmatrix

    ```bash
    pip install canmatrix
    pip install 'git+https://github.com/ebroecker/canmatrix#egg=canmatrix[kcd]'
    ```

4. Use canmatrix to convert the dbc to a kcd file

    ```bash
    canconvert resources/db/Model3CAN.dbc resources/db/Model3CAN.kcd
    ```


