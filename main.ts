datalogger.onLogFull(function () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("FULL RST!")
    datalogger.deleteLog(datalogger.DeleteType.Full)
    music.play(music.createSoundExpression(WaveShape.Noise, 1234, 471, 255, 0, 1000, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    control.reset()
})
radio.onReceivedValue(function (name, value) {
    id = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    datalogger.log(
    datalogger.createCV("sonda", name),
    datalogger.createCV("h2o", value)
    )
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    basic.clearScreen()
    serial.writeString("{")
    serial.writeString("\"t\":" + radio.receivedPacket(RadioPacketProperty.SerialNumber) + ",")
    serial.writeString("\"s\":" + name + ",")
    serial.writeString("\"h\":" + value + ",")
    serial.writeLine("}")
})
let id = 0
radio.setGroup(77)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
datalogger.setColumnTitles(
"sonda",
"h2o"
)
