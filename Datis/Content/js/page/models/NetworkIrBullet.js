﻿Ext.define('prada.page.models.NetworkIrBullet', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Model', type: 'string' },
        { name: 'Overview' },
        { name: 'Description' },
        { name: 'Price' },
        { name: 'ShowPrice' },
         { name: 'ImageSensor' },
      { name: 'EffectivePixels' },
      { name: 'ScanningSystem' },
      { name: 'ElectronicShutterSpeed' },
      { name: 'MinIllumination' },
      { name: 'SNRatio' },
      { name: 'VideoOutput' },
      { name: 'DayNight' },
      { name: 'BacklightCompensation' },
      { name: 'WhiteBalance' },
      { name: 'GainControl' },
      { name: 'NoiseReduction' },
      { name: 'PrivacyMasking' },
      { name: 'FocalLength' },
      { name: 'MaxAperture' },
      { name: 'FocusControl' },
      { name: 'AngleOfView' },
      { name: 'LensType' },
      { name: 'MountType' },
      { name: 'VideoCompression' },
    { name: 'IsNew' },
      { name: 'Resolution' },
      { name: 'FrameRate' },
      { name: 'BitRate' },
      { name: 'AudioCompression' },
      { name: 'Interface' },
      { name: 'Ethernet' },
      { name: 'Protocol' },
      { name: 'ONVIF' },
      { name: 'MaxUserAccess' },
      { name: 'SmartPhone' },
      { name: 'MemorySlot' },
      { name: 'Alarm' },
      { name: 'PowerSupply' },
      { name: 'PowerConsumption' },
      { name: 'WorkingEnvironment' },

      { name: 'WiFi' },
      { name: 'RS485' },
      { name: 'PIRSensorRange' },
      { name: 'IngressProtection' },
      { name: 'VandalResistance' },


      { name: 'Dimensions' },
      { name: 'Weight' }


    ]
});