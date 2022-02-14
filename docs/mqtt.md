# MQTT

## Example MQTT Message
Topic: `tesberry/vehicle/ID273UI_vehicleControl`
```json
{
    accessoryPowerRequest: 1
    alarmEnabled: 1
    ambientLightingEnabled: 0
}
```

## Change values

You don't need to put all values in the JSON it's enough to only set the changing ones
The topic has to be appended by `/SET`.

Topic: `tesberry/vehicle/ID273UI_vehicleControl/SET`
```json
{
    alarmEnabled: 0
    ambientLightingEnabled: 1
}
```
