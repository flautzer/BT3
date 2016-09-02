def which(cmd)
    exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
    ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
        exts.each { |ext|
            exe = File.join(path, "#{cmd}#{ext}")
            return exe if File.executable? exe
        }
    end
    return nil
end

Vagrant.configure("2") do |config|

    provisioner = Vagrant::Util::Platform.windows? ? :guest_ansible : :ansible

    config.vm.synced_folder "C:\\Users\\Flautz\\WebstormProjects\\BT2", "/var/www"

    config.vm.provider :virtualbox do |v|
        v.name = "vagrant_default"
        v.customize [
            "modifyvm", :id,
            "--name", "BTAPI",
            "--memory", 2048,
            "--natdnshostresolver1", "on",
            "--cpus", 2,
        ]
    end

    config.vm.box = "ubuntu/trusty64"
    
    config.vm.network :private_network, ip: "192.168.50.30"
    config.ssh.forward_agent = true

    # If ansible is in your path it will provision from your HOST machine
    # If ansible is not found in the path it will be installed in the VM and provisioned from there
    if which('ansible-playbook')
        config.vm.provision provisioner do |ansible|
            ansible.playbook = "ansible/vagrant.yml"
            ansible.inventory_path = "ansible/inventories/dev"
            ansible.limit = 'all'
        end
    else
        config.vm.provision :shell, path: "bootstrap.sh", args: ["default"]
    end

end
