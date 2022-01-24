**ELM327 AT Commands**

*Version in which the command ﬁrst appeared...*

| **version** | **Command**       | **Description**                         | **Group** |
| ----------- | ----------------- | --------------------------------------- | --------- |
| 1.0         | @1                | display the device description          | General   |
| 1.3         | @2                | display the device identiﬁer            | General   |
| 1.3         | @3 cccccccccccc   | store the device identiﬁer              | General   |
| 1.0         | CR                | repeat the last command                 | General   |
| 1.0         | AL                | Allow Long (7 byte) messages            | OBD       |
| 1.2         | AR                | Automatic Receive                       | OBD       |
| 1.2         | AT0               | Adaptive Timing Off                     | OBD       |
| 1.2         | AT1               | Adaptive Timing Auto1                   | OBD       |
| 1.2         | AT2               | Adaptive Timing Auto2                   | OBD       |
| 1.0         | BD                | perform a Buffer Dump                   | OBD       |
| 1.0         | BI                | Bypass the Initialization sequence      | OBD       |
| 1.2         | BRD hh            | try Baud rate Divisor hh                | General   |
| 1.2         | BRT hh            | set Baud Rate handshake Timeout         | General   |
| 1.0         | CAF0              | CAN Automatic Formatting Off            | CAN       |
| 1.0         | CAF1              | CAN Automatic Formatting On             | CAN       |
| 1.4         | CEA               | turn off CAN Extended Addressing        | CAN       |
| 1.4         | CEA hh            | use CAN Extended Address hh             | CAN       |
| 1.0         | CF hh hh hh hh    | set the ID Filter to hhhhhhhh           | CAN       |
| 1.0         | CF hhh            | set the ID Filter to hhh                | CAN       |
| 1.0         | CFC0              | CAN FlowControl Off                     | CAN       |
| 1.0         | CFC1              | CAN Flow Control On                     | CAN       |
| 1.0         | CM hh hh hh hh    | set the ID Mask to hhhhhhhh             | CAN       |
| 1.0         | CM hhh            | set the ID Mask to hhh                  | CAN       |
| 1.0         | CP hh             | set CAN Priority (only for 29 bit)      | CAN       |
| 1.4b        | CRA               | reset CAN Receive Address ﬁlters        | CAN       |
| 1.3         | CRA hhh           | set CAN Receive Address to hhh          | CAN       |
| 1.3         | CRA hhhhhhhh      | set CAN Receive Address to hhhhhhhh     | CAN       |
| 1.0         | CS                | show the CAN Status                     | CAN       |
| 1.4b        | CSM0              | CAN Silent Mode Off                     | CAN       |
| 1.4b        | CSM1              | CAN Silent Mode On                      | CAN       |
| 1.0         | CV dddd           | Calibrate the Voltage to dd.dd volts    | Volts     |
| 1.4         | CV 0000           | Restore CV value to factory setting     | Volts     |
| 1.0         | D                 | set all to Defaults                     | General   |
| 1.3         | D0                | display of the DLC Off                  | CAN       |
| 1.3         | D1                | display of the DLC On                   | CAN       |
| 1.2         | DM1               | (J1939) Monitor for DM1 messages        | J1939     |
| 1.0         | DP                | Describe the current Protocol           | OBD       |
| 1.0         | DPN               | Describe the  Protocol by Number        | OBD       |
| 1.0         | E0                | Echo Off                                | General   |
| 1.0         | E1                | Echo On                                 | General   |
| 1.1         | FC SD [1-5 bytes] | Flow Control  Set Data to [...]         | CAN       |
| 1.1         | FC SH hh hh hh hh | Flow Control Set the Header to hhhhhhhh | CAN       |
| 1.1         | FC SH hhh         | Flow Control Set the Header to hhh      | CAN       |
| 1.1         | FC SM h           | Flow Control                            | CAN       |
|             |                   | Set the Mode                            |           |
|             |                   | to h                                    |           |
|             |                   |                                         |           |
| 1.3a        | FE                | Forget Events                           | General   |
|             |                   |                                         |           |
| 1.4         | FI                | perform a                               | ISO       |
|             |                   | Fast                                    |           |
|             |                   | Initiation                              |           |
|             |                   |                                         |           |
| 1.0         | H0                | Headers Off                             | OBD       |
|             |                   |                                         |           |
| 1.0         | H1                | Headers On                              | OBD       |
|             |                   |                                         |           |
| 1.0         | I                 | Print the ID                            | General   |
|             |                   |                                         |           |
| 1.0         | IB 10             | set the ISO                             | ISO       |
|             |                   | Baud rate to                            |           |
|             |                   | 10400                                   |           |
|             |                   |                                         |           |
| 1.4         | IB 48             | set the ISO                             | ISO       |
|             |                   | Baud rate to                            |           |
|             |                   | 4800                                    |           |
|             |                   |                                         |           |
| 1.0         | IB 96             | set the ISO                             | ISO       |
|             |                   | Baud rate to                            |           |
|             |                   | 9600                                    |           |
|             |                   |                                         |           |
| 1.2         | IFR H             | IFR value from Header                              | J1850     |
|             |                   |                              |           |
| 1.2         | IFR S             | IFR value from Source                              | J1850     |
| 1.2         | IFR0              | IFRs Off                                | J1850     |
| 1.2         | IFR1              | IFRs Auto                               | J1850     |
|             |                   |                                         |           |
| 1.2         | IFR2              | IFRs On                                 | J1850     |
|             |                   |                                         |           |
| 1.4         | IGN               | read the                                | Other     |
|             |                   | IgnMon input                            |           |
|             |                   | level                                   |           |
|             |                   |                                         |           |
| 1.2         | IIA hh            | set the ISO                             | ISO       |
|             |                   | (slow) Init                             |           |
|             |                   | Address to hh                           |           |
|             |                   |                                         |           |
| 1.3         | JE                | use J1939 Elm                           | J1939     |
|             |                   | data format                             |           |
|             |                   |                                         |           |
| 1.4b        | JHF0              | J1939 Header                            | J1939     |
|             |                   | Formatting                              |           |
|             |                   | Off                                     |           |
|             |                   |                                         |           |
| 1.4b        | JHF1              | J1939 Header                            | J1939     |
|             |                   | Formatting On                           |           |
|             |                   |                                         |           |
| 1.3         | JS                | use J1939 SAE                           | J1939     |
|             |                   | data format                             |           |
|             |                   |                                         |           |
| 1.4b        | JTM1              | set the J1939                           | J1939     |
|             |                   | Timer                                   |           |
|             |                   | Multiplier to                           |           |
|             |                   | 1x                                      |           |
|             |                   |                                         |           |
| 1.4b        | JTM5              | set the J1939                           | J1939     |
|             |                   | Timer                                   |           |
|             |                   | Multiplier to                           |           |
|             |                   | 5x                                      |           |
|             |                   |                                         |           |
| 1.3         | KW                | display the                             | ISO       |
|             |                   | Key Words                               |           |
|             |                   |                                         |           |
| 1.2         | KW0               | Key Word                                | ISO       |
|             |                   | checking Off                            |           |
|             |                   |                                         |           |
| 1.2         | KW1               | Key Word                                | ISO       |
|             |                   | checking On                             |           |
|             |                   |                                         |           |
| 1.0         | L0                | Linefeeds Off                           | General   |
|             |                   |                                         |           |
| 1.0         | L1                | Linefeeds On                            | General   |
|             |                   |                                         |           |
| 1.4         | LP                | go to Low Power mode                    | General   |
| 1.0         | M0                | Memory Off                              | General   |
| ---         |                   |                                         |           |
| 1.0         | M1                | Memory On                               | General   |
| ---         |                   |                                         |           |
| 1.0         | MA                | Monitor All                             | OBD       |
| ---         |                   |                                         |           |
| 1.2         | MP hhhh           | (J1939)                                 | J1939     |
|             |                   | Monitor for                             |           |
|             |                   | PGN hhhh                                |           |
| ---         |                   |                                         |           |
| 1.4b        | MP hhhh n         | (J1939) Monitor                         | J1939     |
|             |                   | for PGN hhhh,                           |           |
|             |                   | get n messages                          |           |
| ---         |                   |                                         |           |
| 1.3         | MP hhhhhh         | (J1939)                                 | J1939     |
|             |                   | Monitor for                             |           |
|             |                   | PGN hhhhhh                              |           |
| ---         |                   |                                         |           |
| 1.4b        | MP hhhhhh n       | (J1939)                                 | J1939     |
|             |                   | Monitor for                             |           |
|             |                   | PGN hhhhhh,                             |           |
|             |                   | get n messages                          |           |
| ---         |                   |                                         |           |
| 1.0         | MR hh             | Monitor for                             | OBD       |
|             |                   | Receiver = hh                           |           |
| ---         |                   |                                         |           |
| 1.0         | MT hh             | Monitor for                             | OBD       |
|             |                   | Transmitter =                           |           |
|             |                   | hh                                      |           |
| ---         |                   |                                         |           |
| 1.0         | NL                | Normal Length                           | OBD       |
|             |                   | (7 byte)                                |           |
|             |                   | messages                                |           |
| ---         |                   |                                         |           |
| 1.4         | PB xx yy          | set Protocol B                          | CAN       |
|             |                   | options and                             |           |
|             |                   | baud rate                               |           |
| ---         |                   |                                         |           |
| 1.0         | PC                | Protocol Close                          | OBD       |
| ---         |                   |                                         |           |
| 1.1         | PP FF OFF         | all Prog                                | PPs       |
|             |                   | Parameters Off                          |           |
| ---         |                   |                                         |           |
| 1.1         | PP FF ON          | all Prog                                | PPs       |
|             |                   | Parameters On                           |           |
| ---         |                   |                                         |           |
| 1.1         | PP xx OFF         | disable Prog                            | PPs       |
|             |                   | Parameter xx                            |           |
| ---         |                   |                                         |           |
| 1.1         | PP xx ON          | enable Prog                             | PPs       |
|             |                   | Parameter xx                            |           |
| ---         |                   |                                         |           |
| 1.1         | PP xx SV yy       | for PP xx, Set                          | PPs       |
|             |                   | the Value to                            |           |
|             |                   | yy                                      |           |
| ---         |                   |                                         |           |
| 1.1         | PPS               | print a PP                              | PPs       |
|             |                   | Summary                                 |           |
| ---         |                   |                                         |           |
| 1.0         | R0                | Responses Off                           | OBD       |
| ---         |                   |                                         |           |
| 1.0         | R1                | Responses On                            | OBD       |
| ---         |                   |                                         |           |
| 1.3         | RA hh             | set the                                 | OBD       |
|             |                   | Receive                                 |           |
|             |                   | Address to hh                           |           |
| ---         |                   |                                         |           |
| 1.4         | RD                | Read the                                | General   |
|             |                   | stored Data                             |           |
| ---         |                   |                                         |           |
| 1.3         | RTR               | send an RTR                             | CAN       |
|             |                   | message                                 |           |
| ---         |                   |                                         |           |
| 1.0         | RV                | Read the                                | Volts     |
|             |                   | Voltage                                 |           |
| ---         |                   |                                         |           |
| 1.3         | S0                | printing of                             | OBD       |
|             |                   | Spaces Off                              |           |
| ---         |                   |                                         |           |
| 1.3         | S1                | printing of                             | OBD       |
|             |                   | Spaces On                               |           |
| ---         |                   |                                         |           |
| 1.4         | SD hh             | Store Data                              | General   |
|             |                   | byte hh                                 |           |
| ---         |                   |                                         |           |
| 1.0         | SH xx yy zz       | Set Header                              | OBD       |
| ---         |                   |                                         |           |
| 1.0         | SH yzz            | Set Header                              | OBD       |
| ---         |                   |                                         |           |
| 1.4         | SI                | perform a Slow                          | ISO       |
|             |                   | Initiation                              |           |
| ---         |                   |                                         |           |
| 1.0         | SP Ah             | Set Protocol                            | OBD       |
|             |                   | to Auto, h and                          |           |
|             |                   | save it                                 |           |
| ---         |                   |                                         |           |
| 1.0         | SP h              | Set Protocol                            | OBD       |
|             |                   | to h and save                           |           |
|             |                   | it                                      |           |
| ---         |                   |                                         |           |
| 1.3         | SP 00             | Set Protocol to Auto and save it        | OBD       |
| 1.2         | SR hh             | Set the Receive address to hh           | OBD       |
| 1.4         | SS                | set Standard Search order (J1978)       | OBD       |
| 1.0         | ST hh             | Set Timeout to hh x 4 msec              | OBD       |
| 1.0         | SW hh             | Set Wakeup interval to hh x 20 msec     | ISO       |
| 1.4         | TA hh             | set Tester                              | OBD       |
|             |                   | Address to hh                           |           |
| 1.0         | TP Ah             | Try Protocol h with Auto search         | OBD       |
| 1.0         | TP h              | Try Protocol h                          | OBD       |
| 1.3         | V0                | use of Variable DLC Off                 | CAN       |
| 1.3         | V1                | use of Variable DLC On                  | CAN       |
|             |                   |                                         |           |
| 1.2         | WM \[1-6          | Set the                                 | ISO       |
|             | bytes\]           | Wakeup                                  |           |
|             |                   | Message                                 |           |
|             |                   |                                         |           |
| 1.0         | WM xxyyzzaa       | set the                                 | ISO       |
|             |                   | Wakeup                                  |           |
|             |                   | Message to                              |           |
|             |                   | xxyyzzaa                                |           |
|             |                   |                                         |           |
| 1.0         | WM xxyyzzaabb     | set the                                 | ISO       |
|             |                   | Wakeup                                  |           |
|             |                   | Message to                              |           |
|             |                   | xxyyzzaabb                              |           |
|             |                   |                                         |           |
| 1.0         | WM xxyyzzaabbcc   | set the                                 | ISO       |
|             |                   | Wakeup                                  |           |
|             |                   | Message to                              |           |
|             |                   | xxyyzzaabbcc                            |           |
|             |                   |                                         |           |
| 1.0         | WS                | Warm Start                              | General   |
|             |                   |                                         |           |
| 1.0         | Z                 | reset all                               | General   |

*Elm Electronics Inc., October 2010*