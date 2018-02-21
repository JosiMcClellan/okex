task :start do
  exec 'foreman start -p 3000 --procfile LocalProcfile'
end
