import { RESULT_SUCCESS } from './index'

interface Value {
  freq: string;
  band: string;
  resolution: string;
  max_hold: string;
}

// const initValue: Value = {
//   "freq": "1400",
//   "band": "1",
//   "resolution": "10",
//   "max_hold": "on"
// }

const scanpoint: any[] = []

export default {
  scan: {
    get: () => {
      const tmpdata: string[] = [];
      scanpoint.forEach(() => {
        tmpdata.push(-Math.floor(Math.random() * 120) + '');
      });


      return {
        ...RESULT_SUCCESS,

        value: {
          "rssi": tmpdata
        }
      }
    },
    set: (value: Value) => {
      const { band } = value

      const span = parseInt(band);
      const step = (10 * 1000) / 1024;
      const stepFixed = step.toFixed(3); //取小数点后3位
      const points = (span * 1000) / parseFloat(stepFixed); //计算要取几个点
      scanpoint.length = 0

      for (let index = 0; index < Math.floor(points); index++) {
        scanpoint.push('-120');
      }

      return RESULT_SUCCESS
    },
    stop: () => {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "recommend": [
            "1401",
            "1402"
          ]
        },
      }
    }
  },
  log: {
    get: () => {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "filename": "cgi-bin/nbmesh.log"
        },
      }
    }
  },
  downloadlog: {
    get: () => {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "filename": "https://www.voidtools.com/Everything-1.4.1.1009.x64-Setup.exe"
        },
      }
    }
  }
}

export const logInfo = `* Stopping Read required files in advance[74G[ OK ]
* Starting Mount filesystems on boot[74G[ OK ]
* Starting Initialize or finalize resolvconf[74G[ OK ]
* Starting Signal sysvinit that the rootfs is mounted[74G[ OK ]
* Stopping Track if upstart is running in a container[74G[ OK ]
* Starting set console keymap[74G[ OK ]
* Starting Signal sysvinit that virtual filesystems are mounted[74G[ OK ]
* Starting Signal sysvinit that virtual filesystems are mounted[74G[ OK ]
* Starting Bridge udev events into upstart[74G[ OK ]
* Starting Signal sysvinit that remote filesystems are mounted[74G[ OK ]
* Starting device node and kernel event manager[74G[ OK ]
* Starting Clean /tmp directory[74G[ OK ]
* Starting load modules from /etc/modules[74G[ OK ]
* Starting cold plug devices[74G[ OK ]
* Starting log initial device creation[74G[ OK ]
* Stopping Clean /tmp directory[74G[ OK ]
* Stopping load modules from /etc/modules[74G[ OK ]
* Starting Signal sysvinit that local filesystems are mounted[74G[ OK ]
* Stopping Mount filesystems on boot[74G[ OK ]
* Starting D-Bus system message bus[74G[ OK ]
* Stopping set console keymap[74G[ OK ]
* Starting flush early job output to logs[74G[ OK ]
* Starting SystemD login management service[74G[ OK ]
* Stopping flush early job output to logs[74G[ OK ]
* Starting bluetooth daemon[74G[ OK ]
* Starting system logging daemon[74G[ OK ]
* Starting Uncomplicated firewall[74G[ OK ]
* Starting configure network device security[74G[ OK ]
* Starting configure network device[74G[ OK ]
* Starting mDNS/DNS-SD daemon[74G[ OK ]
* Starting CUPS printing spooler/server[74G[ OK ]
* Starting Reload cups, upon starting avahi-daemon to make sure remote queues are populated[74G[ OK ]
* Stopping Reload cups, upon starting avahi-daemon to make sure remote queues are populated[74G[ OK ]
* Starting cups-browsed - Bonjour remote printer browsing daemon[74G[ OK ]
* Starting Bridge file events into upstart[74G[ OK ]
* Starting configure network device security[74G[ OK ]
* Starting Mount network filesystems[74G[ OK ]
* Starting Failsafe Boot Delay[74G[ OK ]
* Stopping Mount network filesystems[74G[ OK ]
* Stopping Failsafe Boot Delay[74G[ OK ]
* Starting System V initialisation compatibility[74G[ OK ]
* Starting modem connection manager[74G[ OK ]
* Starting configure network device security[74G[ OK ]
* Starting configure network device[74G[ OK ]
* Starting network connection manager[74G[ OK ]
* Starting userspace bootsplash[74G[ OK ]
* Starting Send an event to indicate plymouth is up[74G[ OK ]
* Stopping Send an event to indicate plymouth is up[74G[ OK ]
* Starting Bridge socket events into upstart[74G[ OK ]
* Stopping userspace bootsplash[74G[ OK ]
Skipping profile in /etc/apparmor.d/disable: usr.bin.firefox
Skipping profile in /etc/apparmor.d/disable: usr.sbin.rsyslogd
* Starting AppArmor profiles       [100G 
[94G[ OK ]
* Setting up X socket directories...       [100G 
[94G[ OK ]
* Stopping System V initialisation compatibility[74G[ OK ]
* Starting System V runlevel compatibility[74G[ OK ]
* Starting regular background program processing daemon[74G[ OK ]
* Starting anac(h)ronistic cron[74G[ OK ]
* Starting save kernel messages[74G[ OK ]
* Starting configure network device security[74G[ OK ]
* Starting ACPI daemon[74G[ OK ]
* Starting crash report submission daemon[74G[ OK ]
* Stopping save kernel messages[74G[ OK ]
* Starting automatic crash report generation[74G[ OK ]
* Starting configure virtual network devices[74G[ OK ]
* Stopping Restore Sound Card State[74G[ OK ]
`